const addLogService = require('../services/addLog.service');
const getLogsService = require('../services/getLogs.service');
const createServiceService = require('../services/createService.service');

async function addLog(req, res, next) {
    try {
        let response = await addLogService.addLog(req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while adding log:', err);
        next(err);
    }
}

async function getLogs(req, res, next) {
    try {
        let response = await getLogsService.getLogs(req.query);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while getting logs:', err);
        next(err);
    }
}

async function createService(req, res, next) {
    try {
        let response = await createServiceService.createService(req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while creating service:', err);
        next(err);
    }
}

module.exports = { addLog, getLogs, createService };
