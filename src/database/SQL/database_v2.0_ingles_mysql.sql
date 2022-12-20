DROP SCHEMA `promacol_v3`;

CREATE SCHEMA `promacol_v3`;

CREATE TABLE `promacol_v3`.`identity_document`(
    ident_document_id INT NOT NULL AUTO_INCREMENT,
    descrip VARCHAR(50),
    PRIMARY KEY (`ident_document_id`)
);

CREATE TABLE `promacol_v3`.`room`(
    room_id INT NOT NULL AUTO_INCREMENT,
    room_name VARCHAR(30),
    PRIMARY KEY (`room_id`)
);

CREATE TABLE `promacol_v3`.`employee`(
    employee_id INT NOT NULL AUTO_INCREMENT,
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
    PRIMARY KEY (`employee_id`),
    FOREIGN KEY(room_id) REFERENCES room(room_id),
    FOREIGN KEY(ident_document_id) REFERENCES identity_document(ident_document_id)
);

CREATE TABLE `promacol_v3`.`role`(
    role_id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (`role_id`)
);

CREATE TABLE `promacol_v3`.`user`(
    user_id INT NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status BOOLEAN,
    PRIMARY KEY (`user_id`),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE `promacol_v3`.`user_role`(
    role_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(role_id) REFERENCES role(role_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
);

CREATE TABLE `promacol_v3`.`category`(
    category_id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (`category_id`)
);

CREATE TABLE `promacol_v3`.`job`(
    job_id INT NOT NULL AUTO_INCREMENT,
    category_id INT NOT NULL,
    job_name VARCHAR(30),
    PRIMARY KEY(job_id),
    FOREIGN KEY(category_id) REFERENCES category(category_id)
);

CREATE TABLE `promacol_v3`.`employee_job`(
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

CREATE TABLE `promacol_v3`.`assistance`(
    asstc_id INT NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
    date_in DATE NOT NULL,
    time_in TIME NOT NULL,
    date_out DATE,
    time_out TIME,
    status BOOLEAN,
    PRIMARY KEY(asstc_id),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE `promacol_v3`.`food_drink_dispatch`(
    fb_dispatch_id INT NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    PRIMARY KEY(fb_dispatch_id),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
);

CREATE TABLE `promacol_v3`.`session`(
    session_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    start_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_date DATE,
    end_time TIME,
    status BOOLEAN,
    PRIMARY KEY(session_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
);

CREATE TABLE `promacol_v3`.`payroll`(
    payroll_id INT NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
    user_id INT NOT NULL,
    total_bs DECIMAL(20, 5) NOT NULL,
    total_dollar DECIMAL(20, 5) NOT NULL,
    pay_bs DECIMAL(20, 5) NOT NULL,
    pay_dollar DECIMAL(20, 5) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    PRIMARY KEY(payroll_id),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
);

CREATE TABLE `promacol_v3`.`measure_type`(
    measure_type_id INT NOT NULL AUTO_INCREMENT,
    descrip VARCHAR(30),
    PRIMARY KEY(measure_type_id)
);

CREATE TABLE `promacol_v3`.`measure`(
    measure_id INT NOT NULL AUTO_INCREMENT,
    measure_type_id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    symbol VARCHAR(10),
    PRIMARY KEY(measure_id),
    FOREIGN KEY(measure_type_id) REFERENCES measure_type(measure_type_id)
);

CREATE TABLE `promacol_v3`.`product`(
    prod_id INT NOT NULL AUTO_INCREMENT,
    measure_id INT NOT NULL,
    prod_name VARCHAR(30) NOT NULL,
    descrip VARCHAR(30),
    PRIMARY KEY(prod_id),
    FOREIGN KEY(measure_id) REFERENCES measure(measure_id)
);

CREATE TABLE `promacol_v3`.`worker_production`(
    worker_prod_id INT NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
    total DECIMAL(20, 5) NOT NULL,
    start_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_date DATE,
    end_time TIME,
    status BOOLEAN,
    PRIMARY KEY(worker_prod_id),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE `promacol_v3`.`payroll_detail`(
    payroll_detail_id INT NOT NULL AUTO_INCREMENT,
    payroll_id INT NOT NULL,
    prod_id INT NOT NULL,
    worker_prod_id INT NOT NULL,
    employee_id INT NOT NULL,
    quantity INT NOT NULL,
    total_bs DECIMAL(20, 5) NOT NULL,
    status BOOLEAN,
    PRIMARY KEY(payroll_detail_id),
    FOREIGN KEY(payroll_id) REFERENCES payroll(payroll_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY(worker_prod_id) REFERENCES worker_production(worker_prod_id)
);

CREATE TABLE `promacol_v3`.`worker_production_detail`(
    worker_prod_det_id INT NOT NULL AUTO_INCREMENT,
    worker_prod_id INT NOT NULL,
    user_id INT NOT NULL,
    prod_id INT NOT NULL,
    employee_id INT NOT NULL,
    quantity INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    PRIMARY KEY(worker_prod_det_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(worker_prod_id) REFERENCES worker_production(worker_prod_id)
);

CREATE TABLE `promacol_v3`.`catch_zone`(
    catch_zone_id INT NOT NULL AUTO_INCREMENT,
    catch_zone_name VARCHAR(30) NOT NULL,
    catch_zone_code VARCHAR(30) NOT NULL,
    PRIMARY KEY(catch_zone_id)
);

CREATE TABLE `promacol_v3`.`supplier`(
    supplier_id INT NOT NULL AUTO_INCREMENT,
    supplier_code VARCHAR(30) NOT NULL,
    name1 VARCHAR(30) NOT NULL,
    name2 VARCHAR(30),
    lastname1 VARCHAR(30) NOT NULL,
    lastname2 VARCHAR(30),
    id_number INT NOT NULL,
    phone VARCHAR(30),
    company VARCHAR(30),
    status BOOLEAN,
    PRIMARY KEY(supplier_id)
);

CREATE TABLE `promacol_v3`.`supplier_zone`(
    supplier_zone_id INT NOT NULL AUTO_INCREMENT,
    catch_zone_id INT NOT NULL,
    supplier_id INT NOT NULL,
    PRIMARY KEY(supplier_zone_id),
    FOREIGN KEY(catch_zone_id) REFERENCES catch_zone(catch_zone_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id)
);

CREATE TABLE `promacol_v3`.`produc_extrac`(
    prod_ext_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    total DECIMAL(20, 5) NOT NULL,
    PRIMARY KEY(prod_ext_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
);

CREATE TABLE `promacol_v3`.`produc_extrac_detail`(
    prod_ext_det_id INT NOT NULL AUTO_INCREMENT,
    prod_ext_id INT NOT NULL,
    supplier_zone_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity DECIMAL(20, 5) NOT NULL,
    PRIMARY KEY(prod_ext_det_id),
    FOREIGN KEY(prod_ext_id) REFERENCES produc_extrac(prod_ext_id),
    FOREIGN KEY(supplier_zone_id) REFERENCES supplier_zone(supplier_zone_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);

CREATE TABLE `promacol_v3`.`history_ext_product`(
    history_ext_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    prod_ext_det_id INT NOT NULL,
    descrip VARCHAR(30),
    act VARCHAR(20),
    status BOOLEAN,
    PRIMARY KEY(history_ext_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(prod_ext_det_id) REFERENCES produc_extrac_detail(prod_ext_det_id)
);

CREATE TABLE `promacol_v3`.`invoice_type`(
    invoice_type_id INT NOT NULL AUTO_INCREMENT,
    descrip VARCHAR(30),
    PRIMARY KEY(invoice_type_id)
);

CREATE TABLE `promacol_v3`.`pay_type`(
    pay_type_id INT NOT NULL AUTO_INCREMENT,
    descrip VARCHAR(30) NOT NULL,
    PRIMARY KEY(pay_type_id)
);

CREATE TABLE `promacol_v3`.`invoice`(
    invoice_id INT NOT NULL AUTO_INCREMENT,
    invoice_type_id INT NOT NULL,
    prod_id INT NOT NULL,
    invoice_code VARCHAR(30) NOT NULL,
    supplier_id INT NOT NULL,
    user_id INT NOT NULL,
    quantity DECIMAL(20, 5) NOT NULL,
    amount DECIMAL(20, 5) NOT NULL,
    total DECIMAL(20, 5) NOT NULL,
    iva DECIMAL(20, 5),
    date DATE NOT NULL,
    time TIME NOT NULL,
    PRIMARY KEY(invoice_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(invoice_type_id) REFERENCES invoice_type(invoice_type_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id)
);

CREATE TABLE `promacol_v3`.`invoice_detail`(
    invoice_detail_id INT NOT NULL AUTO_INCREMENT,
    invoice_id INT NOT NULL,
    pay_type_id INT NOT NULL,
    prod_id INT NOT NULL,
    price DECIMAL(20, 5) NOT NULL,
    quantity DECIMAL(20, 5) NOT NULL,
    currency_id INT NOT NULL,
    PRIMARY KEY(invoice_detail_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(invoice_id) REFERENCES invoice(invoice_id),
    FOREIGN KEY(pay_type_id) REFERENCES pay_type(pay_type_id)
);

CREATE TABLE `promacol_v3`.`product_weight`(
    prod_weight_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    total DECIMAL(20, 5) NOT NULL,
    PRIMARY KEY(prod_weight_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
);

CREATE TABLE `promacol_v3`.`product_weight_detail`(
    prod_weight_det_id INT NOT NULL AUTO_INCREMENT,
    prod_weight_id INT NOT NULL,
    supplier_zone_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity DECIMAL(20, 5) NOT NULL,
    descrip VARCHAR(30),
    PRIMARY KEY(prod_weight_det_id),
    FOREIGN KEY(prod_weight_id) REFERENCES product_weight(prod_weight_id),
    FOREIGN KEY(supplier_zone_id) REFERENCES supplier_zone(supplier_zone_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);

CREATE TABLE `promacol_v3`.`history_weight`(
    history_weight_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    prod_weight_det_id INT NOT NULL,
    descrip VARCHAR(30),
    act VARCHAR(20),
    status BOOLEAN,
    PRIMARY KEY(history_weight_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(prod_weight_det_id) REFERENCES product_weight_detail(prod_weight_det_id)
);

CREATE TABLE `promacol_v3`.`vehicle_type`(
    vehicle_type_id INT NOT NULL AUTO_INCREMENT,
    descrip VARCHAR(30) NOT NULL,
    PRIMARY KEY(vehicle_type_id)
);

CREATE TABLE `promacol_v3`.`vehicle`(
    vehicle_id INT NOT NULL AUTO_INCREMENT,
    vehicle_type_id INT NOT NULL,
    brand VARCHAR(30) NOT NULL,
    model VARCHAR(30),
    license_plate VARCHAR(30),
    status BOOLEAN,
    PRIMARY KEY(vehicle_id),
    FOREIGN KEY(vehicle_type_id) REFERENCES vehicle_type(vehicle_type_id)
);

CREATE TABLE `promacol_v3`.`vehicle_supplier`(
    vehicle_supplier_id INT NOT NULL AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    log_date DATE NOT NULL,
    log_time TIME NOT NULL,
    PRIMARY KEY(vehicle_supplier_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id)
);

CREATE TABLE `promacol_v3`.`reception`(
    recept_id INT NOT NULL AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    catch_zone_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity DECIMAL(20, 5) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status BOOLEAN,
    PRIMARY KEY(recept_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id),
    FOREIGN KEY(catch_zone_id) REFERENCES catch_zone(catch_zone_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);

CREATE TABLE `promacol_v3`.`dispatch`(
    dispatch_id INT NOT NULL AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity DECIMAL(20, 5) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status BOOLEAN,
    PRIMARY KEY(dispatch_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);

CREATE TABLE `promacol_v3`.`hydrated_weight`(
    hydra_weight_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    catch_zone_id INT NOT NULL,
    supplier_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    start_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_date DATE,
    end_time TIME,
    total DECIMAL(20, 5) NOT NULL,
    PRIMARY KEY(hydra_weight_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(catch_zone_id) REFERENCES catch_zone(catch_zone_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id)
);

CREATE TABLE `promacol_v3`.`base`(
    base_id INT NOT NULL AUTO_INCREMENT,
    code VARCHAR(30) NOT NULL,
    descrip VARCHAR(30) NOT NULL,
    weight DECIMAL(20, 5),
    PRIMARY KEY(base_id)
);

CREATE TABLE `promacol_v3`.`container`(
    container_id INT NOT NULL AUTO_INCREMENT,
    code INT NOT NULL,
    descrip VARCHAR(30) NOT NULL,
    weight DECIMAL(20, 5),
    PRIMARY KEY(container_id)
);

CREATE TABLE `promacol_v3`.`hydrated_weight_detail`(
    hydra_weight_det_id INT NOT NULL AUTO_INCREMENT,
    hydra_weight_id INT NOT NULL,
    container_id INT,
    net_weight DECIMAL(20, 5),
    tare_weight DECIMAL(20, 5),
    gross_weight DECIMAL(20, 5),
    date DATE NOT NULL,
    time TIME NOT NULL,
    PRIMARY KEY(hydra_weight_det_id),
    FOREIGN KEY(hydra_weight_id) REFERENCES hydrated_weight(hydra_weight_id),
    FOREIGN KEY(container_id) REFERENCES container(container_id)
);

CREATE TABLE `promacol_v3`.`dry_weight`(
    dry_weight_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    catch_zone_id INT,
    supplier_id INT NOT NULL,
    vehicle_id INT,
    start_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_date DATE,
    end_time TIME,
    total DECIMAL(20, 5) NOT NULL,
    PRIMARY KEY(dry_weight_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(catch_zone_id) REFERENCES catch_zone(catch_zone_id),
    FOREIGN KEY(supplier_id) REFERENCES supplier(supplier_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id)
);

CREATE TABLE `promacol_v3`.`dry_weight_detail`(
    dry_weight_det_id INT NOT NULL AUTO_INCREMENT,
    dry_weight_id INT NOT NULL,
    container_id INT NOT NULL,
    net_weight DECIMAL(20, 5),
    tare_weight DECIMAL(20, 5),
    gross_weight DECIMAL(20, 5),
    baskets DECIMAL(20, 5),
    date DATE NOT NULL,
    time TIME NOT NULL,
    PRIMARY KEY(dry_weight_det_id),
    FOREIGN KEY(dry_weight_id) REFERENCES dry_weight(dry_weight_id),
    FOREIGN KEY(container_id) REFERENCES container(container_id)
);

CREATE TABLE `promacol_v3`.`currency`(
    currency_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    abbrev VARCHAR(30),
    PRIMARY KEY(currency_id)
);

CREATE TABLE `promacol_v3`.`price`(
    price_id INT NOT NULL AUTO_INCREMENT,
    currency_id INT NOT NULL,
    price DECIMAL(20, 5) NOT NULL,
    PRIMARY KEY(price_id),
    FOREIGN KEY(currency_id) REFERENCES currency(currency_id)
);

CREATE TABLE `promacol_v3`.`history_price`(
    history_price_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    price_id INT NOT NULL,
    actual_price DECIMAL(20, 5) NOT NULL,
    previous_price DECIMAL(20, 5) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    PRIMARY KEY(history_price_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(price_id) REFERENCES price(price_id)
);

CREATE TABLE `promacol_v3`.`product_price`(
    prod_id INT NOT NULL,
    price_id INT NOT NULL,
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(price_id) REFERENCES price(price_id)
);

CREATE TABLE `promacol_v3`.`exchange_rate`(
    exchange_id INT NOT NULL AUTO_INCREMENT,
    input_currency VARCHAR(30),
    output_currency VARCHAR(30),
    exchange_value DECIMAL(20, 5),
    PRIMARY KEY(exchange_id)
);

CREATE TABLE `promacol_v3`.`exchange_price`(
    exchange_id INT NOT NULL,
    price_id INT NOT NULL,
    FOREIGN KEY(exchange_id) REFERENCES exchange_rate(exchange_id),
    FOREIGN KEY(price_id) REFERENCES price(price_id)
);

CREATE TABLE `promacol_v3`.`history_exchange`(
    history_exch_id INT NOT NULL AUTO_INCREMENT,
    exchange_id INT NOT NULL,
    user_id INT NOT NULL,
    exchange_value DECIMAL(20, 5) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    PRIMARY KEY(history_exch_id),
    FOREIGN KEY(exchange_id) REFERENCES exchange_rate(exchange_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id)
);

CREATE TABLE `promacol_v3`.`inventory`(
    inventory_id INT NOT NULL AUTO_INCREMENT,
    prod_id INT NOT NULL,
    supplier_zone_id INT NOT NULL,
    inv_code VARCHAR(30),
    stock INT NOT NULL,
    descrip VARCHAR(30),
    date DATE NOT NULL,
    time TIME NOT NULL,
    status BOOLEAN,
    PRIMARY KEY(inventory_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id),
    FOREIGN KEY(supplier_zone_id) REFERENCES supplier_zone(supplier_zone_id)
);

CREATE TABLE `promacol_v3`.`raw_material_lot`(
    raw_mat_lot_id INT NOT NULL AUTO_INCREMENT,
    supplier_zone_id INT NOT NULL,
    measure_id INT NOT NULL,
    prod_id INT NOT NULL,
    quantity DECIMAL(20, 5) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status BOOLEAN,
    PRIMARY KEY(raw_mat_lot_id),
    FOREIGN KEY(supplier_zone_id) REFERENCES supplier_zone(supplier_zone_id),
    FOREIGN KEY(measure_id) REFERENCES measure(measure_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);

CREATE TABLE `promacol_v3`.`raw_material_lot_detail`(
    raw_mat_lot_det_id INT NOT NULL AUTO_INCREMENT,
    raw_mat_lot_id INT NOT NULL,
    prod_id INT NOT NULL,
    descrip VARCHAR(30),
    quantity DECIMAL(20, 5),
    status BOOLEAN,
    PRIMARY KEY(raw_mat_lot_det_id),
    FOREIGN KEY(raw_mat_lot_id) REFERENCES raw_material_lot(raw_mat_lot_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);

CREATE TABLE `promacol_v3`.`lot`(
    lot_id INT NOT NULL AUTO_INCREMENT,
    lot_code INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status BOOLEAN,
    PRIMARY KEY(lot_id)
);

CREATE TABLE `promacol_v3`.`prod_pres`(
    prod_pres_id INT NOT NULL AUTO_INCREMENT,
    descrip VARCHAR(30) NOT NULL,
    PRIMARY KEY(prod_pres_id)
);

CREATE TABLE `promacol_v3`.`pallet`(
    pallet_id INT NOT NULL AUTO_INCREMENT,
    prod_pres_id INT NOT NULL,
    unit_quantity INT NOT NULL,
    unit_package INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status BOOLEAN,
    PRIMARY KEY(pallet_id),
    FOREIGN KEY(prod_pres_id) REFERENCES prod_pres(prod_pres_id)
);

CREATE TABLE `promacol_v3`.`lot_detail`(
    lot_id INT NOT NULL AUTO_INCREMENT,
    pallet_id INT NOT NULL,
    raw_mat_lot_id INT NOT NULL,
    PRIMARY KEY(lot_id),
    FOREIGN KEY(pallet_id) REFERENCES pallet(pallet_id),
    FOREIGN KEY(raw_mat_lot_id) REFERENCES raw_material_lot(raw_mat_lot_id)
);

CREATE TABLE `promacol_v3`.`product_job`(
    job_id INT NOT NULL,
    prod_id INT NOT NULL,
    FOREIGN KEY(job_id) REFERENCES job(job_id),
    FOREIGN KEY(prod_id) REFERENCES product(prod_id)
);

-- DOCUMENTO_IDENTIDAD
INSERT INTO
    `promacol_v3`.`identity_document`(descrip)
VALUES
    ('VENEZOLANO');

-- ROL
INSERT INTO
    `promacol_v3`.`role`(role_id, role_name)
VALUES
    (1, 'Administrador');

INSERT INTO
    `promacol_v3`.`role`(role_id, role_name)
VALUES
    (2, 'Analista');

INSERT INTO
    `promacol_v3`.`role`(role_id, role_name)
VALUES
    (3, 'Cajero');

INSERT INTO
    `promacol_v3`.`role`(role_id, role_name)
VALUES
    (4, 'Supervisor de sistema');

INSERT INTO
    `promacol_v3`.`role`(role_id, role_name)
VALUES
    (5, 'Supervisor de peso');

INSERT INTO
    `promacol_v3`.`role`(role_id, role_name)
VALUES
    (6, 'Jefe');

INSERT INTO
    `promacol_v3`.`role`(role_id, role_name)
VALUES
    (7, 'Gerente');

INSERT INTO
    `promacol_v3`.`role`(role_id, role_name)
VALUES
    (8, 'Obrero');

INSERT INTO
    `promacol_v3`.`role`(role_id, role_name)
VALUES
    (9, 'Sanetizacion');

INSERT INTO
    `promacol_v3`.`role`(role_id, role_name)
VALUES
    (10, 'Coordinador de producción');

-- SALA
-- INSERT INTO room(room_name)VALUES ('Cangrejo');
-- INSERT INTO room(room_name)VALUES ('Colmillo');
-- INSERT INTO room(room_name)VALUES ('Revisado de carne blanca');
-- INSERT INTO room(room_name)VALUES ('Revisado de carne negra');
-- INSERT INTO room(room_name)VALUES ('Revisado de carne jumbo');
-- INSERT INTO room(room_name)VALUES ('Desconche');
INSERT INTO
    `promacol_v3`.`room`(room_name)
VALUES
    ('Extracción');

INSERT INTO
    `promacol_v3`.`room`(room_name)
VALUES
    ('Revisado');

-- INSERT INTO `promacol_v3`.`room`(room_name)VALUES ('Desconche');
-- CATEGORIA
INSERT INTO
    `promacol_v3`.`category`(category_id, category_name)
VALUES
    (1, 'General');

INSERT INTO
    `promacol_v3`.`category`(category_id, category_name)
VALUES
    (2, 'Obrero');

-- PUESTO_TRABAJO
/* puesto de trabajo para el personal de solo cocktail */
INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (1, 2, 'Cangrejero');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (2, 2, 'Colmillero');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (3, 2, 'Revisador de carne blanca');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (4, 2, 'Revisador de carne negra');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (5, 2, 'Revisador de carne jumbo');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (6, 2, 'Desconchador');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (7, 1, 'Administrador');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (8, 1, 'Analista');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (9, 1, 'Cajero');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (10, 1, 'Supervisor de sistema');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (11, 1, 'Supervisor de peso');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (12, 1, 'Jefe');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (13, 1, 'Gerente');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (14, 1, 'Operario');

INSERT INTO
    `promacol_v3`.`job`(job_id, category_id, job_name)
VALUES
    (15, 1, 'Coordinador de producción');

/* inser de un nuevo puesto de trabajo de supervisor */
-- TIPO DE MEDIDA
INSERT INTO
    `promacol_v3`.`measure_type`(descrip)
VALUES
    ('Masa');

INSERT INTO
    `promacol_v3`.`measure_type`(descrip)
VALUES
    ('Volumen');

-- MEDIDA
INSERT INTO
    `promacol_v3`.`measure`(measure_type_id, name, symbol)
VALUES
    (1, 'gramo', 'g');

INSERT INTO
    `promacol_v3`.`measure`(measure_type_id, name, symbol)
VALUES
    (1, 'kilogramo', 'Kg');

-- PRODUCTO
INSERT INTO
    `promacol_v3`.`product` (prod_id, measure_id, prod_name, descrip)
VALUES
    (1, 1, 'Jumbo', null);

INSERT INTO
    `promacol_v3`.`product` (prod_id, measure_id, prod_name, descrip)
VALUES
    (2, 1, 'Lump', null);

INSERT INTO
    `promacol_v3`.`product` (prod_id, measure_id, prod_name, descrip)
VALUES
    (3, 1, 'Claw', null);

INSERT INTO
    `promacol_v3`.`product` (prod_id, measure_id, prod_name, descrip)
VALUES
    (4, 1, 'Cocktail', null);

INSERT INTO
    `promacol_v3`.`product` (prod_id, measure_id, prod_name, descrip)
VALUES
    (5, 1, 'R/Lump', null);

INSERT INTO
    `promacol_v3`.`product` (prod_id, measure_id, prod_name, descrip)
VALUES
    (6, 1, 'R/Claw', null);

INSERT INTO
    `promacol_v3`.`product` (prod_id, measure_id, prod_name, descrip)
VALUES
    (7, 1, 'R/Cocktail', null);

INSERT INTO
    `promacol_v3`.`product` (prod_id, measure_id, prod_name, descrip)
VALUES
    (8, 1, 'R/Jumbo', null);

INSERT INTO
    `promacol_v3`.`product` (prod_id, measure_id, prod_name, descrip)
VALUES
    (9, 1, 'Cesta/Desc', null);

-- ZONA EXTRACCION
INSERT INTO
    `promacol_v3`.`catch_zone` (catch_zone_name, catch_zone_code)
VALUES
    ('La Rita', '01');

INSERT INTO
    `promacol_v3`.`catch_zone` (catch_zone_name, catch_zone_code)
VALUES
    ('Pta Gorda', '02');

INSERT INTO
    `promacol_v3`.`catch_zone` (catch_zone_name, catch_zone_code)
VALUES
    ('Positos', '03');

INSERT INTO
    `promacol_v3`.`catch_zone` (catch_zone_name, catch_zone_code)
VALUES
    ('Bachaquero', '04');

INSERT INTO
    `promacol_v3`.`catch_zone` (catch_zone_name, catch_zone_code)
VALUES
    ('Mene Grande', '05');

INSERT INTO
    `promacol_v3`.`catch_zone` (catch_zone_name, catch_zone_code)
VALUES
    ('Moteo', '06');

INSERT INTO
    `promacol_v3`.`catch_zone` (catch_zone_name, catch_zone_code)
VALUES
    ('Bobure', '07');

INSERT INTO
    `promacol_v3`.`catch_zone` (catch_zone_name, catch_zone_code)
VALUES
    ('San Francisco', '08');

INSERT INTO
    `promacol_v3`.`catch_zone` (catch_zone_name, catch_zone_code)
VALUES
    ('La Cañada', '09');

INSERT INTO
    `promacol_v3`.`catch_zone` (catch_zone_name, catch_zone_code)
VALUES
    ('Caño O', '10');

INSERT INTO
    `promacol_v3`.`catch_zone` (catch_zone_name, catch_zone_code)
VALUES
    ('Barranquita', '11');

-- EMPLEADO
INSERT INTO
    `promacol_v3`.`employee`(
        room_id,
        ident_document_id,
        emp_code,
        name1,
        name2,
        lastname1,
        lastname2,
        id_number,
        email,
        phone,
        birthday,
        address,
        hide_date,
        dismiss_date,
        status
    )
VALUES
    (
        NULL,
        1,
        'AD-1',
        'Luis',
        NULL,
        'Bocaranda',
        NULL,
        25342581,
        'luisbocaranda19@gmail.com',
        NULL,
        '1996/12/6',
        NULL,
        '2022/1/1',
        NULL,
        true
    );

INSERT INTO
    `promacol_v3`.`employee`(
        room_id,
        ident_document_id,
        emp_code,
        name1,
        name2,
        lastname1,
        lastname2,
        id_number,
        email,
        phone,
        birthday,
        address,
        hide_date,
        dismiss_date,
        status
    )
VALUES
    (
        NULL,
        1,
        'AN-1',
        'Alberto',
        NULL,
        'Bocaranda',
        NULL,
        25342580,
        'luisbocaranda19@gmail.com',
        NULL,
        '1995/06/06',
        NULL,
        '2022/1/1',
        NULL,
        true
    );

INSERT INTO
    `promacol_v3`.`employee`(
        room_id,
        ident_document_id,
        emp_code,
        name1,
        name2,
        lastname1,
        lastname2,
        id_number,
        email,
        phone,
        birthday,
        address,
        hide_date,
        dismiss_date,
        status
    )
VALUES
    (
        NULL,
        1,
        'CA-1',
        'Eddy',
        NULL,
        'Bocaranda',
        NULL,
        5815422,
        'luisbocaranda19@gmail.com',
        NULL,
        '1961/09/17',
        NULL,
        '2022/1/1',
        NULL,
        true
    );

INSERT INTO
    `promacol_v3`.`currency`(name, abbrev)
VALUES
    ('Bolivar', 'Bs');

INSERT INTO
    `promacol_v3`.`currency`(name, abbrev)
VALUES
    ('Dolar', '$');

-- USUARIO
INSERT INTO
    `promacol_v3`.`user`(employee_id, username, password, status)
VALUES
    (
        1,
        'luisb',
        '$2a$10$E79wfw.vWdoT72KF.43OAOexE7qXZu7R.OFCtN3mfXLDlIiAieD4W',
        true
    );

INSERT INTO
    `promacol_v3`.`user`(employee_id, username, password, status)
VALUES
    (
        2,
        'albertob',
        '$2a$10$E79wfw.vWdoT72KF.43OAOexE7qXZu7R.OFCtN3mfXLDlIiAieD4W',
        true
    );

INSERT INTO
    `promacol_v3`.`user`(employee_id, username, password, status)
VALUES
    (
        3,
        'eddyb',
        '$2a$10$E79wfw.vWdoT72KF.43OAOexE7qXZu7R.OFCtN3mfXLDlIiAieD4W',
        true
    );

-- ROL_USUARIO
INSERT INTO
    `promacol_v3`.`user_role`(role_id, user_id)
VALUES
    (1, 1);

INSERT INTO
    `promacol_v3`.`user_role`(role_id, user_id)
VALUES
    (2, 2);

INSERT INTO
    `promacol_v3`.`user_role`(role_id, user_id)
VALUES
    (3, 3);

-- PRODUCTO_JOB
INSERT INTO
    `promacol_v3`.`product_job`(job_id, prod_id)
VALUES
    (1, 1);

INSERT INTO
    `promacol_v3`.`product_job`(job_id, prod_id)
VALUES
    (1, 2);

INSERT INTO
    `promacol_v3`.`product_job`(job_id, prod_id)
VALUES
    (2, 3);

INSERT INTO
    `promacol_v3`.`product_job`(job_id, prod_id)
VALUES
    (2, 4);

INSERT INTO
    `promacol_v3`.`product_job`(job_id, prod_id)
VALUES
    (3, 5);

INSERT INTO
    `promacol_v3`.`product_job`(job_id, prod_id)
VALUES
    (4, 6);

INSERT INTO
    `promacol_v3`.`product_job`(job_id, prod_id)
VALUES
    (4, 7);

INSERT INTO
    `promacol_v3`.`product_job`(job_id, prod_id)
VALUES
    (5, 8);

INSERT INTO
    `promacol_v3`.`product_job`(job_id, prod_id)
VALUES
    (6, 9);

-- INSERT INTO `promacol_v3`.`exchange_rate` VALUES(1, "BOLIVAR", "DOLAR", 99.1998);

INSERT INTO
    `promacol_v3`.`exchange_rate`(
        exchange_id,
        input_currency,
        output_currency,
        exchange_value
    ) VALUES (1, "BOLIVAR", "DOLAR", "99.19987");

INSERT INTO
    `promacol_v3`.`exchange_rate`(
        exchange_id,
        input_currency,
        output_currency,
        exchange_value
    ) VALUES (2, "DOLAR", "BOLIVAR", "1.12227");

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (1, 1, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (2, 2, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (3, 1, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (4, 2, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (5, 1, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (6, 2, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (7, 1, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (8, 2, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (9, 1, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (10, 2, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (11, 1, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (12, 2, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (13, 1, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (14, 2, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (15, 1, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (16, 2, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (17, 1, 0);

INSERT INTO
    `promacol_v3`.`price`(price_id, currency_id, price) VALUES (18, 2, 0);

INSERT INTO
    `promacol_v3`.`exchange_price`(exchange_id, price_id)
VALUES
    (1, 1);

INSERT INTO
    `promacol_v3`.`exchange_price`(exchange_id, price_id)
VALUES
    (1, 3);

INSERT INTO
    `promacol_v3`.`exchange_price`(exchange_id, price_id)
VALUES
    (1, 5);

INSERT INTO
    `promacol_v3`.`exchange_price`(exchange_id, price_id)
VALUES
    (1, 7);

INSERT INTO
    `promacol_v3`.`exchange_price`(exchange_id, price_id)
VALUES
    (1, 9);

INSERT INTO
    `promacol_v3`.`exchange_price`(exchange_id, price_id)
VALUES
    (1, 11);

INSERT INTO
    `promacol_v3`.`exchange_price`(exchange_id, price_id)
VALUES
    (1, 13);

INSERT INTO
    `promacol_v3`.`exchange_price`(exchange_id, price_id)
VALUES
    (1, 15);

INSERT INTO
    `promacol_v3`.`exchange_price`(exchange_id, price_id)
VALUES
    (1, 17);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (1, 1);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (1, 2);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (2, 3);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (2, 4);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (3, 5);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (3, 6);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (4, 7);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (4, 8);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (5, 9);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (5, 10);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (6, 11);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (6, 12);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (7, 13);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (7, 14);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (8, 15);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (8, 16);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (9, 17);

INSERT INTO
    `promacol_v3`.`product_price`(prod_id, price_id) VALUES (9, 18);