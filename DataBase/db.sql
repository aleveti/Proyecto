create database mande;

create table person (
    person_id serial primary key,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    phone varchar(10) NOT NULL UNIQUE,
    status varchar(2)
);

CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    person_id INT,
    status VARCHAR(2),
    CONSTRAINT fk_addres_person
    FOREIGN KEY (person_id) 
    REFERENCES person(person_id)
);

CREATE TABLE users (
    user_id INT PRIMARY KEY,
    utility_bill VARCHAR(500) NOT NULL,
    status VARCHAR(2),
    CONSTRAINT fk_users_person
    FOREIGN KEY (user_id) 
    REFERENCES person(person_id)
);

CREATE TABLE payment_method (
    payment_id SERIAL PRIMARY KEY,
    cvv VARCHAR(4) NOT NULL,
    card_number VARCHAR(20) NOT NULL,
    card_type VARCHAR(10) NOT NULL,
    expiration_date DATE DEFAULT CURRENT_DATE NOT NULL,
    user_id int,
    status VARCHAR(2),
    CONSTRAINT fk_paymentmethod_user
    FOREIGN KEY (user_id) 
    REFERENCES users(user_id)
);

CREATE TABLE employee (
    employee_id INT PRIMARY KEY,
    photo_ID VARCHAR(500) NOT NULL,
    profile_picture VARCHAR(500) NOT NULL,
    cash INT,
    available VARCHAR(2),
    status VARCHAR(2),
    CONSTRAINT fk_employee_person
    FOREIGN KEY (employee_id) 
    REFERENCES person(person_id)
);

CREATE TABLE reviews (
    reviews_id SERIAL PRIMARY KEY,
    employee_id INT UNIQUE,
    total_jobs INT,
    rating FLOAT,
    CONSTRAINT fk_reviews_employee
    FOREIGN KEY (employee_id) 
    REFERENCES employee(employee_id)
);

CREATE TABLE works (
    work_id SERIAL PRIMARY KEY,
    names VARCHAR(100) NOT NULL,
    status VARCHAR(2)
);

CREATE TABLE employees_work (
    employee_id INT,
    work_id INT,
    price_hour INT NOT NULL,
    CONSTRAINT pk_employees_work
    PRIMARY KEY (employee_id, work_id),
    CONSTRAINT pk_employeeswork_work
    FOREIGN KEY (work_id) 
    REFERENCES works(work_id),
    CONSTRAINT pk_employeeswork_employee
    FOREIGN KEY (employee_id) 
    REFERENCES employee(employee_id)
);

CREATE TABLE pay (
    pay_id SERIAL PRIMARY KEY,
    employee_pay INT NOT NULL,
    profit_mande INT NOT NULL,
    total_payment INT NOT NULL,
    service_id INT,
    pay_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(2),
    CONSTRAINT fk_pay_service
    FOREIGN KEY (service_id)
    REFERENCES service(service_id)
);

CREATE TABLE service (
    service_id SERIAL PRIMARY KEY,
    hours INT,
    status_rating VARCHAR(2),
    user_id INT,
    employee_id INT,
    status VARCHAR(2),
    CONSTRAINT fk_service_employee
    FOREIGN KEY (employee_id) 
    REFERENCES employee(employee_id),
    CONSTRAINT fk_service_users
    FOREIGN KEY (user_id) 
    REFERENCES users(user_id)
);


INSERT INTO public.works (names,status) VALUES
	 ('Plomero','Y'),
	 ('Piloto','N'),
	 ('Electricista','Y'),
	 ('Programador','Y'),
	 ('Piloto','Y');
     