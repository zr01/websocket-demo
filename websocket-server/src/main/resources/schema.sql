CREATE TABLE IF NOT EXISTS users (
    id      VARCHAR(60)     DEFAULT RANDOM_UUID()   PRIMARY KEY,
    name    VARCHAR(25)     NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    id      VARCHAR(60)     DEFAULT RANDOM_UUID()   PRIMARY KEY,
    user_Id  VARCHAR(60)     NOT NULL,
    type    VARCHAR         NOT NULL,
    content VARCHAR,
    FOREIGN KEY (user_Id) REFERENCES users(id)
);