-- 1. Tabla de Clientes / Abonados (Vinculada a Planes)
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL,
    ip_address VARCHAR(45) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'Habilitado',
    plan_id INT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_customer_plan FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE RESTRICT
);

-- 2. Tabla de Reclamos y Soporte Técnico (Vinculada a Customers y Users)
CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    assigned_user_id INT, -- Técnico u operador asignado (puede ser NULL al inicio)
    category VARCHAR(100) NOT NULL,
    priority VARCHAR(50) NOT NULL DEFAULT 'Media',
    status VARCHAR(50) NOT NULL DEFAULT 'Abierto',
    description TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ticket_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    CONSTRAINT fk_ticket_user FOREIGN KEY (assigned_user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- =============================================================================
-- REGISTROS SEMILLA (Mínimo 5 por tabla)
-- =============================================================================

-- 5 Abonados de prueba asociados a los planes
INSERT INTO customers (name, dni, email, ip_address, status, plan_id) VALUES
('Juan Pérez', '32111222', 'juan.perez@gmail.com', '192.168.10.15', 'Habilitado', 2),
('Romina Sosa', '35444555', 'romina.sosa@hotmail.com', '192.168.10.16', 'Habilitado', 3),
('Distribuidora Norte SRL', '30712345678', 'contacto@distribuidoranorte.com', '192.168.10.17', 'Habilitado', 4),
('Marcos Juárez', '40888999', 'marcos.j@yahoo.com', '192.168.10.18', 'Suspendido', 1),
('Estudio Contable Albarracín', '28999111', 'administracion@estudio.com.ar', '192.168.10.19', 'Habilitado', 5);

-- 5 Tickets de soporte asociados a clientes y operadores
INSERT INTO tickets (customer_id, assigned_user_id, category, priority, status, description) VALUES
(1, 3, 'Router / Wi-Fi', 'Baja', 'Abierto', 'El abonado solicita cambio de contraseña de red Wi-Fi.'),
(2, 4, 'Fibra Óptica', 'Alta', 'Abierto', 'Luz LOS en rojo en la ONT. Posible corte de acometida.'),
(3, 1, 'Enlace IP', 'Crítica', 'Abierto', 'Caída de sesión BGP en enlace corporativo principal.'),
(4, 5, 'Facturación / Corte', 'Media', 'Resuelto', 'Reactivación de servicio tras pago de comprobante.'),
(5, 2, 'Energía / ONT', 'Alta', 'Resuelto', 'Reemplazo de fuente de alimentación quemada por baja de tensión.');