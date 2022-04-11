CREATE DATABASE repertorio ;

CREATE TABLE repertorio (
    id SERIAL,
    cancion VARCHAR (50),
    artista VARCHAR (50),
    tono VARCHAR (10)
);

ALTER TABLE repertorio IF EXISTS
ADD link VARCHAR(200) [<constraints>];