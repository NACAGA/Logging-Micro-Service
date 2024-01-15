const db = require('./db.service');
const Success = require('./domain/success.domain');
const Error = require('./domain/errors.domain');
const utils = require('../utils/logging.util');

class CreateServiceSuccess extends Success {
    constructor(newServiceId) {
        super();
        this.serviceid = newServiceId;
        this.message = 'Service created successfully';
        this.code = 200;
    }
}

async function createService(service) {
    const createServiceResult = await db.query('INSERT INTO Services (name, description) VALUES (?, ?)', [
        service.name,
        service.description,
    ]);
    if (createServiceResult instanceof Error.BusinessError) return createServiceResult;
    const getNewServiceIdResult = await db.query('SELECT id FROM Services WHERE name=?', [service.name], '');
    if (getNewServiceIdResult instanceof Error.BusinessError) return getNewServiceIdResult;
    const newServiceId = getNewServiceIdResult.result[0].id;
    if (createServiceResult.result.affectedRows > 0) return new CreateServiceSuccess(newServiceId);

    return new Error.CreateServiceError();
}

module.exports = { createService };
