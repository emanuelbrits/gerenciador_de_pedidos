-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "precoUnitario" DOUBLE PRECISION NOT NULL,
    "foto" TEXT,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendaProduto" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "vendaId" TEXT NOT NULL,
    "qtd" INTEGER NOT NULL,
    "precoUnitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "VendaProduto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VendaProduto" ADD CONSTRAINT "VendaProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendaProduto" ADD CONSTRAINT "VendaProduto_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
