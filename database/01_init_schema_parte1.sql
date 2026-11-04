-- 1. Tabla de Usuarios (Operadores, Administradores y Técnicos NOC)
CREATE TABLE
  IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'operador_noc',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

-- 2. Tabla de Planes Comerciales (Velocidades y Tarifas)
CREATE TABLE
  IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    download_speed INT NOT NULL, -- Velocidad de bajada en Mbps
    upload_speed INT NOT NULL, -- Velocidad de subida en Mbps
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

-- =============================================================================
-- REGISTROS SEMILLA 
-- =============================================================================
-- Carga inicial de Usuarios
INSERT INTO
  users (name, email, password, role)
VALUES
  (
    'Eduardo Albarracin',
    'eduardo.noc@ispmanager.net',
    'hash_admin_123',
    'admin'
  ),
  (
    'Alexis Lencina',
    'alexis.noc@ispmanager.net',
    'hash_admin_456',
    'admin'
  ),
  (
    'Carlos Fernandez',
    'carlos.guardia@ispmanager.net',
    'hash_tec_01',
    'tecnico_noc'
  ),
  (
    'Mariana Gomez',
    'mariana.soporte@ispmanager.net',
    'hash_tec_02',
    'operador_noc'
  ),
  (
    'Lucas Benitez',
    'lucas.campo@ispmanager.net',
    'hash_tec_03',
    'tecnico_campo'
  );

-- Carga inicial de Planes Comerciales
INSERT INTO
  plans (name, download_speed, upload_speed, price)
VALUES
  ('Fibra Óptica 50 Mbps', 50, 25, 8000.00),
  ('Fibra Simétrica 150 Mbps', 150, 150, 12000.00),
  ('Fibra Simétrica 300 Mbps', 300, 300, 18000.00),
  ('Fibra Corporativa 600 Mbps', 600, 600, 28000.00),
  ('Enlace Dedicado 1 Gbps', 1000, 1000, 45000.00);