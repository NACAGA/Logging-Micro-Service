CREATE TABLE Services (
    id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE ServiceEvents (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    service_id INTEGER NOT NULL,
    userid INTEGER NOT NULL,
    event TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message TEXT NOT NULL,
    level VARCHAR(255) NOT NULL,
    additional_data TEXT,
    FOREIGN KEY(service_id) REFERENCES Services(id)
);

INSERT INTO Services (name, description) VALUES ('authentication', 'This is an authentication service');
