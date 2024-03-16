-- CreateTable
CREATE TABLE "suppliers" (
    "id" SERIAL NOT NULL,
    "supplier_name" VARCHAR(100) NOT NULL,
    "supplier_email" VARCHAR(50) NOT NULL,
    "mobile_number" VARCHAR(10) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_supplier_email_key" ON "suppliers"("supplier_email");
