// This is a template for a route file.
const express = require('express');
const router = express.Router();
const { body, header } = require('express-validator');
const loggingController = require('../controllers/logging.controller');

const validateRequestBody = (expectedFields) => {
    return (req, res, next) => {
        const missingFields = expectedFields.filter((field) => !(field in req.body));

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing fields: ${missingFields.join(', ')}`,
            });
        }

        next();
    };
};

validateRequestHeaders = (expectedFields) => {
    return (req, res, next) => {
        const missingFields = expectedFields.filter((field) => !(field in req.headers));

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing fields: ${missingFields.join(', ')}`,
            });
        }

        next();
    };
};

/* POST add log */
router.post('/add', [validateRequestBody(['service_id', 'username', 'event', 'timestamp', 'message', 'level'])], loggingController.addLog);

/* GET get logs */
router.get('/get', loggingController.getLogs);

module.exports = router;
