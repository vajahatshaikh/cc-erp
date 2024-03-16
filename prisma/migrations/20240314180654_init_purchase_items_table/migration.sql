-- CreateTable
CREATE TABLE "purchase_items" (
    "id" SERIAL NOT NULL,
    "item_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "purchase_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchase_items_item_name_key" ON "purchase_items"("item_name");
