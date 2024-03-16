-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bill_no" INTEGER NOT NULL,
    "supplier_name" TEXT NOT NULL,
    "purchase_item_name" TEXT NOT NULL,
    "weight" DECIMAL(65,2) NOT NULL,
    "purchase_amount" DECIMAL(65,2) NOT NULL,
    "adat" DECIMAL(65,2) NOT NULL,
    "total_amount" DECIMAL(65,2) NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);
