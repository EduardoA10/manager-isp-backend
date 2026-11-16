-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL DEFAULT 'operador_noc',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "download_speed" INTEGER NOT NULL,
    "upload_speed" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "dni" VARCHAR(20) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "ip_address" VARCHAR(45) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'Habilitado',
    "plan_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "assigned_user_id" INTEGER,
    "category" VARCHAR(100) NOT NULL,
    "priority" VARCHAR(50) NOT NULL DEFAULT 'Media',
    "status" VARCHAR(50) NOT NULL DEFAULT 'Abierto',
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_dni_key" ON "customers"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "customers_ip_address_key" ON "customers"("ip_address");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_assigned_user_id_fkey" FOREIGN KEY ("assigned_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
