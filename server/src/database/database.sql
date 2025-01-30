CREATE TABLE IF NOT EXISTS users(
    user_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(100),
    user_email VARCHAR(100),
    user_password VARCHAR(150),
    user_profile VARCHAR(100),
    PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS publications(
    pub_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50),
    pub_img VARCHAR(150),
    pub_title VARCHAR(100),
    PRIMARY KEY(pub_id),
    CONSTRAINT myUser FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS comments(
    comment_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50),
    pub_id VARCHAR(150),
    comment_title VARCHAR(100),
    PRIMARY KEY(comment_id),
    CONSTRAINT myUserCom FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT myPub FOREIGN KEY (pub_id) REFERENCES publications(pub_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);