class BusinessError {
    constructor() {
        this.message = '';
        this.code = 500;
    }

    getResponse() {
        const properties = { status: this.code, body: {} };
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function' && key !== 'code') {
                properties.body[key] = this[key];
            }
        }
        return properties;
    }
}

class DatabaseError extends BusinessError {
    constructor(err) {
        super();
        this.message = 'Error querying the database';
        this.code = 500;
        this.error = err;
    }
}

class AddLogError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error adding log';
        this.code = 500;
    }
}

class CreateServiceError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error creating service';
        this.code = 500;
    }
}

module.exports = { BusinessError, DatabaseError, AddLogError, CreateServiceError };
