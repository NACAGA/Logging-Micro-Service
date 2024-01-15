const db = require('./db.service');
const Success = require('./domain/success.domain');
const Error = require('./domain/errors.domain');
const utils = require('../utils/logging.util');

class AddLogSuccess extends Success {
    constructor() {
        super();
        this.message = 'Log added successfully';
        this.code = 200;
    }
}

async function addLog(log) {
    const serviceEventsTableFieldsResult = await db.query(
        `SELECT COLUMN_NAME FROM information_schema.columns WHERE TABLE_NAME = 'ServiceEvents' AND COLUMN_NAME NOT IN ('id', 'timestamp')`
    );
    if (serviceEventsTableFieldsResult instanceof Error.BusinessError) return serviceEventsTableFieldsResult;
    const tableColumns = serviceEventsTableFieldsResult.result.map((field) => field.COLUMN_NAME);

    const { query, values } = utils.createLogQueryBuilder(log, tableColumns);
    const addLogQueryResult = await db.query(query, values);
    if (addLogQueryResult instanceof Error.BusinessError) return addLogQueryResult;

    if (addLogQueryResult.result.affectedRows > 0) return new AddLogSuccess();

    return new Error.AddLogError();
}

module.exports = { addLog };
