CREATE DATABASE IF NOT EXISTS talentflow;

USE talentflow;

CREATE TABLE users (
    id VARCHAR(30) PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40),
    user_name VARCHAR(40) UNIQUE NOT NULL,
    email VARCHAR(40) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    roll ENUM("freelancer","cient","admin") DEFAULT "freelancer",
    profile VARCHAR(50)
);

CREATE TABLE freelancers (
    id VARCHAR(30) PRIMARY KEY,
    user_id VARCHAR(30),
    headline TEXT,
    address TEXT,
    about JSON,
    resume VARCHAR(30),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE clients (
    id VARCHAR(30) PRIMARY KEY,
    user_id VARCHAR(30),
    headline TEXT,
    address TEXT,
    about JSON,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE jobs (
    id VARCHAR(30) PRIMARY KEY,
    client_id VARCHAR(30),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status ENUM("active", "closed"),
    requirements JSON,
    responsibilities JSON,
    apply_count INT DEFAULT 0,
    post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline TIMESTAMP NOT NULL,
    salary DOUBLE NOT NULL,
    job_type ENUM("permanent","freelance"),
    category TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE messages (
    id VARCHAR(30) PRIMARY KEY,
    sender_id VARCHAR(30) NOT NULL,
    reciever_id VARCHAR(30) NOT NULL,
    message JSON,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM("read","unread"),
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reciever_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE applications (
    id VARCHAR(30) PRIMARY KEY,
    job_id VARCHAR(30) NOT NULL,
    freelancer_id VARCHAR(30) NOT NULL,
    message TEXT,
    status ENUM("pending","approve","reject") DEFAULT "pending",
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (freelancer_id) REFERENCES freelancers(id) ON DELETE CASCADE
);

CREATE TABLE portfolios (
    id VARCHAR(30) PRIMARY KEY,
    freelancer_id VARCHAR(30) NOT NULL,
    title TEXT NOT NULL,
    descriptions JSON,
    images JSON,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    FOREIGN KEY (freelancer_id) REFERENCES freelancers(id) ON DELETE CASCADE
);

CREATE TABLE skills (
    id VARCHAR(30) PRIMARY KEY,
    freelancer_id VARCHAR(30) NOT NULL,
    name TEXT,
    level DOUBLE,
    skill_type ENUM("hard","soft"),
    FOREIGN KEY (freelancer_id) REFERENCES freelancers(id) ON DELETE CASCADE
);

CREATE TABLE ratings (
    id VARCHAR(30) PRIMARY KEY,
    giver_id VARCHAR(30) NOT NULL,
    reciever_id VARCHAR(30),
    rating_type ENUM("freelancer","client","system"),
    amount DOUBLE NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (giver_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reciever_id) REFERENCES users(id)
);