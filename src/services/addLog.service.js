const db = require('./db.service');
const Success = require('./domain/success.domain');
const Error = require('./domain/errors.domain');
const utils = require('../utils/logging.util');

class AddLogSuccess extends Success {
    constructor(query) {
        super();
        this.query = query;
    }
}

async function addLog(log) {
    const addLogResult = await db.query('INSERT INTO ServiceEvents (?, ?, ?, ?, ?, ?)', log);
    if (addLogResult instanceof Error.BusinessError) return addLogResult;
    const serviceEventsTableFieldsResult = await db.query(
        `SELECT COLUMN_NAME FROM information_schema.columns WHERE TABLE_NAME = 'ServiceEvents' AND COLUMN_NAME NOT IN ('id', 'timestamp')`
    );
    if (serviceEventsTableFieldsResult instanceof Error.BusinessError) return serviceEventsTableFieldsResult;
    const tableColumns = serviceEventsTableFieldsResult.result.map((field) => field.COLUMN_NAME);

    const { query, values } = utils.createLogQueryBuilder(log, tableColumns);
    const addLogQueryResult = await db.query(query, values);
    if (addLogQueryResult instanceof Error.BusinessError) return addLogQueryResult;

    if (addLogQueryResult.result.affectedRows > 0) return new AddLogSuccess(addLogQueryResult.result);

    return new Error.AddLogError();
}

module.exports = { addLog };
