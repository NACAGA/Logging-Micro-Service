CREATE TABLE Services (
    id INTEGER AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE ServiceEvents (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    service_id INTEGER NOT NULL,
    username VARCHAR(255) NOT NULL,
    event TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    message TEXT NOT NULL,
    level VARCHAR(255) NOT NULL,
    additional_data TEXT,
    FOREIGN KEY(service_id) REFERENCES Services(id)
);
