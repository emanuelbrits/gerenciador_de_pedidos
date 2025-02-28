import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async criarProduto(data: Prisma.ProdutoCreateInput) {
    return this.prisma.produto.create({ data });
  }

  async listarProdutos() {
    return this.prisma.produto.findMany(); 
  }

  async obterProdutoPorId(id: string) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  async atualizarProduto(id: string, data: Prisma.ProdutoUpdateInput) {
    return this.prisma.produto.update({ where: { id }, data });
  }

  async deletarProduto(id: string) {
    return this.prisma.produto.delete({ where: { id } });
  }
}
