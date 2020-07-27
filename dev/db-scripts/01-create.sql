CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title varchar(63),
    description varchar(1023),
    complete boolean,
    created date default now()
)
