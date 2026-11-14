# ISP Manager - Backend API REST

Sistema de gestión integral para Proveedores de Servicios de Internet (ISP). Permite administrar el catálogo de planes comerciales, el padrón de abonados, el monitoreo operativo y la mesa de ayuda técnica (tickets), junto con el control de acceso y roles de operadores.

Proyecto desarrollado para la cátedra **Programación 4** — **Universidad Tecnológica Nacional - Facultad Regional Tucumán (UTN-FRT)**.

---

## Equipo de Desarrollo

* **Eduardo Albarracín** — [@EduardoA10](https://github.com/EduardoA10)
* **Alexis Lencina** — [@AlexisLencina-prog](https://github.com/AlexisLencina-prog)

---

## Tecnologías Utilizadas

* **Framework Backend:** NestJS v12 (Node.js + TypeScript)
* **Resolución de Módulos:** CommonJS con tipado estricto
* **Base de Datos:** PostgreSQL (Relacional)
* **Gestión de Configuración:** `@nestjs/config` (Variables de entorno)
* **Pruebas y Documentación de API:** Postman & Vitest

---

## Arquitectura y Estructura de Carpetas

El proyecto sigue una arquitectura modular orientada al dominio. En la raíz de `src/` reside únicamente el punto de entrada `main.ts`, mientras que el módulo raíz (`app`) y los recursos de negocio se organizan dentro de `src/modules/`:

```text
manager-isp-backend/
├── database/
│   ├── 01_init_schema_parte1.sql   # DDL y semillas de users y plans
│   └── 02_init_schema_parte2.sql   # DDL y semillas de customers y tickets
├── src/
│   ├── main.ts                     # Punto de entrada y configuración del puerto
│   └── modules/
│       ├── app/                    # Módulo raíz (AppModule, AppController, AppService)
│       ├── auth/                   # Autenticación (Login y Registro)
│       ├── users/                  # Gestión de operadores y técnicos NOC
│       ├── customers/              # Padrón de abonados del servicio
│       ├── plans/                  # Catálogo comercial de conectividad
│       └── tickets/                # Mesa de ayuda y reclamos técnicos
├── test/                           # Pruebas End-to-End (E2E)
├── .env                            # Variables de entorno locales (ignorado por Git)
├── .gitignore
├── nest-cli.json
├── package.json
└── tsconfig.json
```

Cada recurso dentro de `src/modules/` contiene sus respectivas capas:
* `dto/`: Objetos de transferencia de datos (`create-*.dto.ts` y `update-*.dto.ts`).
* `entities/`: Representación de las entidades del dominio.
* `*.controller.ts`: Definición de rutas y verbos HTTP (`GET`, `POST`, `PATCH`, `DELETE`).
* `*.service.ts`: Lógica de negocio e interacción con la capa de datos.
* `*.module.ts`: Encapsulamiento e inyección de dependencias, importados de forma centralizada en `AppModule`.

---

## Diseño de la Base de Datos (PostgreSQL)

El modelo relacional se compone de 4 tablas principales vinculadas mediante integridad referencial:

```text
[ plans ] 1 ────< N [ customers ] 1 ────< N [ tickets ] N >──── 1 [ users ]
```

### Entidades y Relaciones

1. **`users`**: Almacena administradores, operadores y técnicos de guardia NOC (`id` PK, `email` UNIQUE, `role`).
2. **`plans`**: Catálogo de velocidades de bajada/subida en Mbps y tarifas mensuales (`id` PK).
3. **`customers`**: Abonados del ISP (`id` PK, `dni` UNIQUE, `ip_address` UNIQUE, `status`).
   * **FK `plan_id` $\rightarrow$ `plans(id)`** (`ON DELETE RESTRICT`): Impide eliminar un plan si tiene clientes activos asociados.
4. **`tickets`**: Reclamos técnicos de soporte (`id` PK, `category`, `priority`, `status`, `description`).
   * **FK `customer_id` $\rightarrow$ `customers(id)`** (`ON DELETE CASCADE`): Elimina los tickets asociados si se da de baja definitiva al cliente.
   * **FK `assigned_user_id` $\rightarrow$ `users(id)`** (`ON DELETE SET NULL`): Conserva el ticket sin técnico asignado si el operador es dado de baja.

---

## Instalación y Puesta en Marcha

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone [https://github.com/EduardoA10/manager-isp-backend.git](https://github.com/EduardoA10/manager-isp-backend.git)
cd manager-isp-backend
npm install
```

### 2. Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=4000
DATABASE_URL=postgresql://usuario:password@localhost:5432/isp_manager_db
API_BASE_URL=http://localhost:4000/
```

### 3. Inicializar la Base de Datos

1. Crear una base de datos vacía en PostgreSQL (pgAdmin 4) llamada `isp_manager_db`.
2. Ejecutar en el **Query Tool** los scripts de la carpeta `database/` en orden secuencial:
   * Primero: `database/01_init_schema_parte1.sql` (crea `users` y `plans` + 5 registros semilla por tabla).
   * Segundo: `database/02_init_schema_parte2.sql` (crea `customers` y `tickets` + 5 registros semilla por tabla).

### 4. Ejecutar el Servidor

```bash
# Modo desarrollo (watch mode)
npm run start:dev

# Compilación para producción
npm run build
npm run start:prod
```

El servidor quedará escuchando en `http://localhost:4000`.

---

## Endpoints Base (API REST)

Prefijos de rutas configurados en los controladores de cada recurso:

| Módulo | Ruta Base | Métodos Soportados |
| :--- | :--- | :--- |
| **Root** | `/` | `GET` (Health check) |
| **Auth** | `/modules/auth` | `GET`, `POST`, `PATCH`, `DELETE` |
| **Users** | `/modules/users` | `GET`, `POST`, `PATCH`, `DELETE` |
| **Customers** | `/modules/customers` | `GET`, `POST`, `PATCH`, `DELETE` |
| **Plans** | `/modules/plans` | `GET`, `POST`, `PATCH`, `DELETE` |
| **Tickets** | `/modules/tickets` | `GET`, `POST`, `PATCH`, `DELETE` |

---

## Estrategia de Ramas (Git Workflow)

El repositorio mantiene protegidas las ramas principales y canaliza todo cambio mediante Pull Requests revisados entre pares:

* **`main`**: Rama estable de producción / entregas cerradas.
* **`dev`**: Rama principal de integración del desarrollo.
* **`feature/nombre-funcionalidad`**: Desarrollo de nuevas características o módulos.
* **`fix/nombre-correccion`**: Resolución de errores o bugs.
* **`refactor/nombre-cambio`**: Mejoras estructurales y optimización de código sin alterar comportamiento.
* **`docs/nombre-documentacion`**: Creación y actualización de documentación técnica.

---

## Documentación y Pruebas con Postman

El equipo cuenta con una colección compartida en Postman (`ISP MANAGER API - TP9`) configurada con la variable de entorno `{{baseUrl}}` apuntando a `http://localhost:4000` para validar las respuestas CRUD de cada módulo.