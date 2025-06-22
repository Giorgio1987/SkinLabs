-- Crear y usar la base de datos
DROP DATABASE IF EXISTS esba;
CREATE DATABASE esba;
USE esba;

-- Tabla: pacientes
CREATE TABLE pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(15) UNIQUE,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    direccion VARCHAR(150),
    fecha_nacimiento DATE
);

-- Tabla: profesionales
CREATE TABLE profesionales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    especialidad VARCHAR(100)
);

-- Tabla: consultorios
CREATE TABLE consultorios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100)
);

-- Tabla: turnos_profesionales (relación entre profesional, consultorio, día y horario)
CREATE TABLE turnos_profesionales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_profesional INT NOT NULL,
    id_consultorio INT NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado') NOT NULL,
    hora_desde TIME NOT NULL,
    hora_hasta TIME NOT NULL,
    FOREIGN KEY (id_profesional) REFERENCES profesionales(id),
    FOREIGN KEY (id_consultorio) REFERENCES consultorios(id)
);

-- Tabla: tratamientos
CREATE TABLE tratamientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT,
    id_profesional INT,
    fecha DATE,
    descripcion TEXT,
    observaciones TEXT DEFAULT NULL,
    historial_fecha DATE DEFAULT NULL,
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id),
    FOREIGN KEY (id_profesional) REFERENCES profesionales(id)
);

-- Tabla: citas (corregida, sin restricción anterior, con restricción nueva)
CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    servicio VARCHAR(100),
    fecha DATE,
    hora TIME,
    dni VARCHAR(15),
    consultorio_id INT NOT NULL,
    profesional_id INT NOT NULL,
    CONSTRAINT turno_unico UNIQUE (fecha, hora, profesional_id, consultorio_id)
);

-- Trigger: Evitar agendar en fechas pasadas
DELIMITER //
CREATE TRIGGER evitar_fecha_pasada BEFORE INSERT ON citas
FOR EACH ROW
BEGIN
    IF NEW.fecha < CURDATE() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se puede agendar una cita en una fecha pasada';
    END IF;
END;
//
DELIMITER ;

-- Tabla: empleados
CREATE TABLE empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    clave VARCHAR(255) NOT NULL -- Contraseña hasheada
);

-- Tabla: facturas
CREATE TABLE facturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    dni VARCHAR(20),
    cuil VARCHAR(20),
    direccion VARCHAR(150),
    mail VARCHAR(100),
    fecha DATE,
    monto DECIMAL(10,2),
    metodo_pago VARCHAR(50)
);

-- Insertar empleado admin
INSERT INTO empleados (usuario, clave)
VALUES ('admin', SHA2('1234', 256));

-- Insertar pacientes de prueba
INSERT INTO pacientes (dni, nombre, telefono, direccion, fecha_nacimiento)
VALUES 
('12345678', 'María López', '1122334455', 'Av. Siempreviva 123', '1990-05-12'),
('87654321', 'Juan Pérez', '1133445566', 'Calle Falsa 456', '1985-09-21');

-- Insertar profesionales
INSERT INTO profesionales (id, nombre, especialidad) VALUES
(1, 'Dra. Ana Pérez', 'Dermatóloga'),
(2, 'Lic. Martín Gómez', 'Kinesiólogo'),
(3, 'Dra. Laura Sánchez', 'Esteticista'),
(4, 'Laura Torres', 'Pedicura y manicura');

-- Insertar consultorios
INSERT INTO consultorios (id, nombre) VALUES
(1, 'Consultorio 1'),
(2, 'Consultorio 2'),
(3, 'Consultorio 3');

-- Insertar turnos disponibles por profesional
INSERT INTO turnos_profesionales (id_profesional, id_consultorio, dia_semana, hora_desde, hora_hasta) VALUES
(1, 1, 'Lunes', '09:00:00', '13:00:00'),
(1, 1, 'Miércoles', '14:00:00', '18:00:00'),
(2, 2, 'Martes', '10:00:00', '15:00:00'),
(3, 3, 'Viernes', '08:00:00', '12:00:00');

-- Insertar tratamientos
INSERT INTO tratamientos (id_paciente, id_profesional, fecha, descripcion, observaciones, historial_fecha)
VALUES
(1, 1, '2025-04-01', 'Limpieza facial profunda', 'Piel sensible, recomendación de productos suaves', '2025-04-08'),
(2, 2, '2025-04-02', 'Tratamiento antiacné', 'Buena respuesta al tratamiento, seguir control', '2025-04-10');

-- Insertar citas de prueba
INSERT INTO citas (nombre, telefono, servicio, fecha, hora, dni, consultorio_id, profesional_id) VALUES
('Carla Ramírez', '1144556677', 'Limpieza facial', '2025-12-01', '10:00:00', '32165498', 1, 1),
('Luis González', '1199887766', 'Tratamiento antiacné', '2025-12-03', '14:30:00', '30123456', 2, 2),
('Sofía Álvarez', '1133445566', 'Masajes relajantes', '2025-12-05', '09:00:00', '33876543', 3, 3),
('Mariano Pérez', '1122334455', 'Manicura completa', '2025-12-10', '11:15:00', '32987654', 3, 4),
('Natalia Suárez', '1177665544', 'Consulta dermatológica', '2025-12-15', '13:00:00', '31234567', 1, 1);

CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    activo TINYINT(1) DEFAULT 1,
    imagen VARCHAR(255)
);
INSERT INTO servicios (nombre, descripcion, imagen) VALUES
('Tratamientos faciales', 'Tratamientos personalizados para cada tipo de piel, utilizando productos de alta calidad.', 'facial.png'),
('Masajes relajantes', 'Técnicas especializadas para aliviar el estrés y la tensión muscular.', 'masajes.jpg'),
('Cuidado corporal', 'Tratamientos corporales rejuvenecedores para una piel suave y radiante.', 'corporal.jpg'),
('Depilación', 'Técnicas avanzadas y seguras para una piel perfectamente suave.', 'depilacion.jpg');