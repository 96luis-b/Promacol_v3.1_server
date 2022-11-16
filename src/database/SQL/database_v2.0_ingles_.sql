CREATE TABLE identity_document(
    ident_document_id SERIAL PRIMARY KEY,
    descrip VARCHAR(30)
);

CREATE TABLE room(
    room_id SERIAL PRIMARY KEY,
    room_name VARCHAR(30)
);

CREATE TABLE employee(
    employee_id SERIAL PRIMARY KEY,
    room_id INT,
    ident_document_id INT NOT NULL,
    emp_code VARCHAR(30) NOT NULL,
    name1 VARCHAR(40) NOT NULL,
    name2 VARCHAR(40),
    lastname1 VARCHAR(40) NOT NULL,
    lastname2 VARCHAR(40),
    id_number INT NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(15),
    birthday DATE NOT NULL,
    address VARCHAR(255),
    hide_date DATE NOT NULL,
    dismiss_date DATE,
    status BOOLEAN,
    FOREIGN KEY(room_id) REFERENCES room(room_id),
    FOREIGN KEY(ident_document_id) REFERENCES identity_document(ident_document_id)
);

CREATE TABLE role(
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(30) NOT NULL
);

CREATE TABLE _user(
    user_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    username VARCHAR(30)  NOT NULL,
    password VARCHAR(30) NOT NULL,
    status BOOLEAN,
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE user_role(
    role_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(role_id) REFERENCES role(role_id),
    FOREIGN KEY(user_id) REFERENCES _user(user_id)
);

CREATE TABLE job(
    job_id SERIAL PRIMARY KEY,
    job_name VARCHAR(30)
);

CREATE TABLE employee_job(
    job_id INT NOT NULL,
    employee_id INT NOT NULL,
    date_in DATE NOT NULL,
    time_in TIME NOT NULL,
    date_out DATE, 
    time_out TIME,
    status BOOLEAN,
    FOREIGN KEY(job_id) REFERENCES job(job_id),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE assistance(
    asstc_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    date_in DATE NOT NULL,
    time_in TIME NOT NULL,
    date_out DATE,
    time_out TIME,
    status BOOLEAN,
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE food_drink_dispatch(
    fb_dispatch_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY(user_id) REFERENCES _user(user_id)
);

CREATE TABLE session(
    session_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    start_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_date DATE,
    end_time TIME,
    status BOOLEAN,
    FOREIGN KEY(user_id) REFERENCES _user(user_id)
);  

CREATE TABLE payroll(
    payroll_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    total_bs DECIMAL(10,2),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id)
);  

CREATE TABLE user_payroll(
    payroll_id INT NOT NULL,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY(payroll_id) REFERENCES payroll(payroll_id),
    FOREIGN KEY(user_id) REFERENCES _user(user_id)
);

CREATE TABLE measure_type(
    measure_type_id SERIAL PRIMARY KEY,
    descrip VARCHAR(30)
);

CREATE TABLE measure(
    measure_id SERIAL PRIMARY KEY,
    measure_type_id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    symbol VARCHAR(10),
    FOREIGN KEY(measure_type_id) REFERENCES measure_type(measure_type_id)
);

CREATE TABLE product(
    prod_id SERIAL PRIMARY KEY,
    measure_id INT NOT NULL,
    prod_name VARCHAR(30) NOT NULL,
    descrip VARCHAR(30),
    FOREIGN KEY(measure_id) REFERENCES measure(measure_id)
);

CREATE TABLE payroll_detail(
    payroll_detail_id SERIAL PRIMARY KEY,
    payroll_id INT NOT NULL,
    prod_id INT,
    employee_id INT NOT NULL,
    quantity INT,
    amount_bs DECIMAL(10,2),
    total_bs DECIMAL(10,2) NOT NULL,
    daily_salary DECIMAL(10,2),
    overtime TIME, 
    bonus DECIMAL(10,2),
    status BOOLEAN,
    FOREIGN KEY(payroll_id) REFERENCES payroll(payroll_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE worker_production(
    worker_prod_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    total DECIMAL(4,2) NOT NULL,
    start_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_date DATE,
    end_time TIME,
    status BOOLEAN,
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE worker_production_detail(
    worker_prod_det_id SERIAL PRIMARY KEY,
    worker_prod_id INT NOT NULL,
    user_id INT NOT NULL,
    prod_id INT NOT NULL,
    employee_id INT NOT NULL,
    quantity INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY(user_id) REFERENCES _user(user_id),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(worker_prod_id) REFERENCES worker_production(worker_prod_id)
);

CREATE TABLE catch_zone(
    catch_zone_id SERIAL PRIMARY KEY,
    catch_zone_name VARCHAR(30) NOT NULL,
    catch_zone_code VARCHAR(30) NOT NULL
);

CREATE TABLE supplier(
    supplier_id SERIAL PRIMARY KEY,
    supplier_code VARCHAR(30) NOT NULL,
    name1 VARCHAR(30) NOT NULL,
    name2 VARCHAR(30),
    lastname1 VARCHAR(30) NOT NULL,
    lastname2 VARCHAR(30),
    id_number INT NOT NULL,
    phone VARCHAR(30),
    company VARCHAR(30),
    status BOOLEAN
);


CREATE TABLE supplier_zone(
    supplier_zone_id SERIAL PRIMARY KEY,
    catch_zone_id INT NOT NULL,
    supplier_id INT NOT NULL,
    FOREIGN KEY(catch_zone_id) REFERENCES catch_zone(catch_zone_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id)
);

CREATE TABLE produc_extrac(
    prod_ext_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    total DECIMAL(5,2) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES _user(user_id)
);

CREATE TABLE produc_extrac_detail(
    prod_ext_det_id SERIAL PRIMARY KEY,
    prod_ext_id INT NOT NULL,
    supplier_zone_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity DECIMAL(5,2) NOT NULL,
    FOREIGN KEY(prod_ext_id) REFERENCES produc_extrac(prod_ext_id),
    FOREIGN KEY(supplier_zone_id) REFERENCES supplier_zone(supplier_zone_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);

CREATE TABLE history_ext_product(
    history_ext_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    prod_ext_det_id INT NOT NULL,
    descrip VARCHAR(30),
    act VARCHAR(20),
    status BOOLEAN,
    FOREIGN KEY(user_id) REFERENCES _user(user_id),
    FOREIGN KEY(prod_ext_det_id) REFERENCES produc_extrac_detail(prod_ext_det_id)
);

CREATE TABLE invoice_type(
    invoice_type_id SERIAL PRIMARY KEY,
    descrip VARCHAR(30)
);

CREATE TABLE pay_type(
    pay_type_id SERIAL PRIMARY KEY,
    descrip VARCHAR(30) NOT NULL
);

CREATE TABLE invoice(
    invoice_id SERIAL PRIMARY KEY,
    invoice_type_id INT NOT NULL,
    prod_id INT NOT NULL,
    invoice_code VARCHAR(30) NOT NULL,
    supplier_id INT NOT NULL,
    user_id INT NOT NULL,
    quantity DECIMAL(8,2) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    iva DECIMAL(8,2),
    date DATE NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY(user_id) REFERENCES _user(user_id),
    FOREIGN KEY(invoice_type_id) REFERENCES invoice_type(invoice_type_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id)
);

CREATE TABLE invoice_detail(
    invoice_detail_id SERIAL PRIMARY KEY,
    invoice_id INT NOT NULL,
    pay_type_id INT NOT NULL,
    prod_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    coin_id INT NOT NULL,
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(invoice_id) REFERENCES invoice(invoice_id),
    FOREIGN KEY(pay_type_id) REFERENCES pay_type(pay_type_id)
);

CREATE TABLE product_weight(
    prod_weight_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    total DECIMAL(8,2) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES _user(user_id)
);

CREATE TABLE product_weight_detail(
    prod_weight_det_id SERIAL PRIMARY KEY,
    prod_weight_id INT NOT NULL,
    supplier_zone_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity DECIMAL(8,2) NOT NULL,
    descrip VARCHAR(30),
    FOREIGN KEY(prod_weight_id) REFERENCES product_weight(prod_weight_id),
    FOREIGN KEY(supplier_zone_id) REFERENCES supplier_zone(supplier_zone_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);

CREATE TABLE history_weight(
    history_weight_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    prod_weight_det_id INT NOT NULL,
    descrip VARCHAR(30),
    act VARCHAR(20),
    status BOOLEAN,
    FOREIGN KEY(user_id) REFERENCES _user(user_id),
    FOREIGN KEY(prod_weight_det_id) REFERENCES product_weight_detail(prod_weight_det_id)
);

CREATE TABLE vehicle_type(
    vehicle_type_id SERIAL PRIMARY KEY,
    descrip VARCHAR(30) NOT NULL
);

CREATE TABLE vehicle(
    vehicle_id SERIAL PRIMARY KEY,
    vehicle_type_id INT NOT NULL,
    brand VARCHAR(30) NOT NULL,
    model VARCHAR(30),
    license_plate VARCHAR(30),
    status BOOLEAN,
    FOREIGN KEY(vehicle_type_id) REFERENCES vehicle_type(vehicle_type_id)
);  

CREATE TABLE vehicle_supplier(
    vehicle_supplier_id SERIAL PRIMARY KEY,
    supplier_id INT NOT NULL, 
    vehicle_id INT NOT NULL,
    log_date DATE NOT NULL,
    log_time TIME NOT NULL,
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id)
);

CREATE TABLE reception(
    recept_id SERIAL PRIMARY KEY,
    supplier_id INT NOT NULL,
    catch_zone_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity DECIMAL(8,2) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status BOOLEAN,
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id),
    FOREIGN KEY(catch_zone_id) REFERENCES catch_zone(catch_zone_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);  

CREATE TABLE dispatch(
    dispatch_id SERIAL PRIMARY KEY,
    supplier_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity DECIMAL(8,2) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL, 
    status BOOLEAN,
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);  

CREATE TABLE hydrated_weight(
    hydra_weight_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL, 
    catch_zone_id INT NOT NULL,
    supplier_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    start_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_date DATE,
    end_time TIME,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES _user(user_id),
    FOREIGN KEY(catch_zone_id) REFERENCES catch_zone(catch_zone_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id)
);

CREATE TABLE base(
    base_id SERIAL PRIMARY KEY,
    code VARCHAR(30) NOT NULL,
    descrip VARCHAR(30) NOT NULL,
    weight DECIMAL(3,2)
);

CREATE TABLE container(
    container_id SERIAL PRIMARY KEY,
    code INT NOT NULL,
    descrip VARCHAR(30) NOT NULL,
    weight DECIMAL(3,2)
);

CREATE TABLE hydrated_weight_detail(
    hydra_weight_det_id SERIAL PRIMARY KEY,
    hydra_weight_id INT NOT NULL,
    container_id INT,
    net_weight DECIMAL(5,2),
    tare_weight DECIMAL(5,2),
    gross_weight DECIMAL(5,2),
    date DATE NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY(hydra_weight_id) REFERENCES hydrated_weight(hydra_weight_id),
    FOREIGN KEY(container_id) REFERENCES container(container_id)
);

CREATE TABLE dry_weight(
    dry_weight_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    catch_zone_id INT,
    supplier_id INT NOT NULL,
    vehicle_id INT,
    start_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_date DATE,
    end_time TIME,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES _user(user_id),
    FOREIGN KEY(catch_zone_id) REFERENCES catch_zone(catch_zone_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id)
);

CREATE TABLE dry_weight_detail(
    dry_weight_det_id SERIAL PRIMARY KEY,
    dry_weight_id INT NOT NULL,
    container_id INT NOT NULL,
    net_weight DECIMAL(5,2),
    tare_weight DECIMAL(5,2),
    gross_weight DECIMAL(5,2),
    baskets DECIMAL(2,2),
    date DATE NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY(dry_weight_id) REFERENCES dry_weight(dry_weight_id),
    FOREIGN KEY(container_id) REFERENCES container(container_id)
);

CREATE TABLE coin(
    coin_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    abbrev VARCHAR(30)
);

CREATE TABLE price(
    price_id SERIAL PRIMARY KEY,
    coin_id INT NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    FOREIGN KEY(coin_id) REFERENCES coin(coin_id)
);

CREATE TABLE history_price(
    history_price_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    price_id INT NOT NULL,
    price DECIMAL(5,2),
    date DATE NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY(user_id) REFERENCES _user(user_id),
    FOREIGN KEY(price_id) REFERENCES price(price_id)
);

CREATE TABLE product_price(
    prod_id INT NOT NULL,
    price_id INT NOT NULL,
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(price_id) REFERENCES price(price_id)
);  

CREATE TABLE exchange_rate(
    exchange_id SERIAL PRIMARY KEY,
    descrip VARCHAR(30),
    exchange_value DECIMAL(5,2)
);

CREATE TABLE exchange_price(
    exchange_id INT NOT NULL,
    price_id INT NOT NULL,
    FOREIGN KEY(exchange_id) REFERENCES exchange_rate(exchange_id),
    FOREIGN KEY(price_id) REFERENCES price(price_id)
);

CREATE TABLE history_exchange(
    history_exch_id SERIAL PRIMARY KEY,
    exchange_id INT NOT NULL,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY(exchange_id) REFERENCES exchange_rate(exchange_id),
    FOREIGN KEY(user_id) REFERENCES _user(user_id)

);

CREATE TABLE inventory(
    inventory_id SERIAL PRIMARY KEY,
    prod_id INT NOT NULL,
    supplier_zone_id INT NOT NULL,
    inv_code VARCHAR(30),
    stock INT NOT NULL,
    descrip VARCHAR(30),
    date DATE NOT NULL,
    time TIME NOT NULL,
    status BOOLEAN,
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(supplier_zone_id) REFERENCES supplier_zone(supplier_zone_id)
);

CREATE TABLE raw_material_lot(
    raw_mat_lot_id SERIAL PRIMARY KEY,
    supplier_zone_id INT NOT NULL,
    measure_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status BOOLEAN,
    FOREIGN KEY(supplier_zone_id) REFERENCES supplier_zone(supplier_zone_id),
    FOREIGN KEY(measure_id) REFERENCES measure(measure_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);

CREATE TABLE raw_material_lot_detail(
    raw_mat_lot_det_id SERIAL PRIMARY KEY,
    raw_mat_lot_id INT NOT NULL,
    prod_id INT NOT NULL,
    descrip VARCHAR(30), 
    quantity DECIMAL(5,2),
    status BOOLEAN,
    FOREIGN KEY(raw_mat_lot_id) REFERENCES raw_material_lot(raw_mat_lot_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);

CREATE TABLE lot(
    lot_id SERIAL PRIMARY KEY,
    lot_code INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status BOOLEAN
);

CREATE TABLE prod_pres(
    prod_pres_id SERIAL PRIMARY KEY,
    descrip VARCHAR(30) NOT NULL
);  

CREATE TABLE pallet(
    pallet_id SERIAL PRIMARY KEY,
    prod_pres_id INT NOT NULL,
    unit_quantity INT NOT NULL,
    unit_package INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status BOOLEAN,
    FOREIGN KEY(prod_pres_id) REFERENCES prod_pres(prod_pres_id)
);

CREATE TABLE lot_detail(
    lot_id SERIAL PRIMARY KEY,
    pallet_id INT NOT NULL,
    raw_mat_lot_id INT NOT NULL,
    FOREIGN KEY(pallet_id) REFERENCES pallet(pallet_id),
    FOREIGN KEY(raw_mat_lot_id) REFERENCES raw_material_lot(raw_mat_lot_id)
);



    --DOCUMENTO_IDENTIDAD
INSERT INTO identity_document(descrip) VALUES ('VENEZOLANO');

    --ROL
INSERT INTO role(role_id, role_name) VALUES (1, 'Administrador');
INSERT INTO role(role_id, role_name) VALUES (2, 'Analista');
INSERT INTO role(role_id, role_name) VALUES (3, 'Cajero');
INSERT INTO role(role_id, role_name) VALUES (4, 'Supervisor de sistema');
INSERT INTO role(role_id, role_name) VALUES (5, 'Supervisor de peso');
INSERT INTO role(role_id, role_name) VALUES (6, 'Jefe');
INSERT INTO role(role_id, role_name) VALUES (7, 'Gerente');
INSERT INTO role(role_id, role_name) VALUES (8, 'Obrero');
INSERT INTO role(role_id, role_name) VALUES (9, 'Sanetizacion');
INSERT INTO role(role_id, role_name) VALUES (10, 'Coordinador de producción');

	--SALA
-- INSERT INTO room(room_name)VALUES ('Cangrejo');
-- INSERT INTO room(room_name)VALUES ('Colmillo');
-- INSERT INTO room(room_name)VALUES ('Revisado de carne blanca');
-- INSERT INTO room(room_name)VALUES ('Revisado de carne negra');
-- INSERT INTO room(room_name)VALUES ('Revisado de carne jumbo');
-- INSERT INTO room(room_name)VALUES ('Desconche');
INSERT INTO room(room_name)VALUES ('Extracción');
INSERT INTO room(room_name)VALUES ('Revisado');

	--PUESTO_TRABAJO
INSERT INTO job(job_name)VALUES ('Cangrejero');
INSERT INTO job(job_name)VALUES ('Colmillero');
INSERT INTO job(job_name)VALUES ('Revisador de carne blanca');
INSERT INTO job(job_name)VALUES ('Revisador de carne negra');
INSERT INTO job(job_name)VALUES ('Revisador de carne jumbo');
INSERT INTO job(job_name)VALUES ('Desconchador');

INSERT INTO job(job_name)VALUES ('Administrador');
INSERT INTO job(job_name)VALUES ('Analista');
INSERT INTO job(job_name)VALUES ('Cajero');
INSERT INTO job(job_name)VALUES ('Supervisor de sistema');
INSERT INTO job(job_name)VALUES ('Supervisor de peso');
INSERT INTO job(job_name)VALUES ('Jefe');
INSERT INTO job(job_name)VALUES ('Gerente');
INSERT INTO job(job_name)VALUES ('Obrero');
INSERT INTO job(job_name)VALUES ('Sanetizacion');
INSERT INTO job(job_name)VALUES ('Coordinador de producción');

    --TIPO DE MEDIDA
INSERT INTO measure_type(descrip)VALUES ('Masa');
INSERT INTO measure_type(descrip)VALUES ('Volumen');

    --MEDIDA
INSERT INTO measure(measure_type_id, name, symbol)VALUES (1, 'gramo', 'g');
INSERT INTO measure(measure_type_id, name, symbol)VALUES (1, 'kilogramo', 'Kg');

	--PRODUCTO
INSERT INTO product (measure_id, prod_name, descrip) VALUES (1,'Jumbo', null);
INSERT INTO product (measure_id, prod_name, descrip) VALUES (1,'Lump', null);
INSERT INTO product (measure_id, prod_name, descrip) VALUES (1,'Claw', null);
INSERT INTO product (measure_id, prod_name, descrip) VALUES (1,'Cocktail', null);
INSERT INTO product (measure_id, prod_name, descrip) VALUES (1,'R/Lump', null);
INSERT INTO product (measure_id, prod_name, descrip) VALUES (1,'R/Claw', null);
INSERT INTO product (measure_id, prod_name, descrip) VALUES (1,'R/Cocktail', null);
INSERT INTO product (measure_id, prod_name, descrip) VALUES (1,'R/Jumbo', null);
INSERT INTO product (measure_id, prod_name, descrip) VALUES (1,'Cesta/Desc', null);

	-- ZONA EXTRACCION
INSERT INTO catch_zone (catch_zone_name, catch_zone_code ) VALUES ('La Rita', '01');
INSERT INTO catch_zone (catch_zone_name, catch_zone_code ) VALUES ('Pta Gorda', '02');
INSERT INTO catch_zone (catch_zone_name, catch_zone_code ) VALUES ('Positos', '03');
INSERT INTO catch_zone (catch_zone_name, catch_zone_code ) VALUES ('Bachaquero', '04');
INSERT INTO catch_zone (catch_zone_name, catch_zone_code ) VALUES ('Mene Grande', '05');
INSERT INTO catch_zone (catch_zone_name, catch_zone_code ) VALUES ('Moteo', '06');
INSERT INTO catch_zone (catch_zone_name, catch_zone_code ) VALUES ('Bobure', '07');
INSERT INTO catch_zone (catch_zone_name, catch_zone_code ) VALUES ('San Francisco', '08');
INSERT INTO catch_zone (catch_zone_name, catch_zone_code ) VALUES ('La Cañada', '09');
INSERT INTO catch_zone (catch_zone_name, catch_zone_code ) VALUES ('Caño O', '10');
INSERT INTO catch_zone (catch_zone_name, catch_zone_code ) VALUES ('Barranquita', '11');



    --EMPLEADO
INSERT INTO employee(room_id, ident_document_id, emp_code, name1, name2, lastname1, lastname2, id_number, email, phone, birthday, address, hide_date, dismiss_date, status) 
    VALUES(NULL, 1, 'luisb', 'AD-1', 'Luis', NULL, 'Bocaranda', NULL, 25342581,'luisbocaranda19@gmail.com', NULL, '06/12/199', NULL, '1/1/2022', NULL, true);

INSERT INTO coin(name, abbrev) VALUES('Bolivar', 'Bs');
INSERT INTO coin(name, abbrev) VALUES('Dolar', '$');

    --USUARIO
INSERT INTO _user(employee_id, password, status) VALUES(1, '$2a$10$E79wfw.vWdoT72KF.43OAOexE7qXZu7R.OFCtN3mfXLDlIiAieD4W', true);

	--ROL_USUARIO
INSERT INTO user_role(role_id, user_id)VALUES (1, 1);

