-- CreateTable
CREATE TABLE "market_fees" (
    "id" SERIAL NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purchase_item_name" TEXT NOT NULL,
    "market_cess" DECIMAL(65,2) NOT NULL,

    CONSTRAINT "market_fees_pkey" PRIMARY KEY ("id")
);
