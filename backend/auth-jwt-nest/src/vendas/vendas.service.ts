import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VendasService {
  constructor(private prisma: PrismaService) {}

  async criarVenda(data: Prisma.VendaCreateInput) {
    return this.prisma.venda.create({ data });
  }

  async listarVendas() {
    return this.prisma.venda.findMany({
      include: { produtos: true }, // Inclui os produtos vendidos
    });
  }

  async obterVendaPorId(id: string) {
    const venda = await this.prisma.venda.findUnique({
      where: { id },
      include: { produtos: true },
    });

    if (!venda) {
      throw new NotFoundException('Venda não encontrada');
    }
    return venda;
  }

  async atualizarVenda(id: string, data: Prisma.VendaUpdateInput) {
    return this.prisma.venda.update({ where: { id }, data });
  }

  async deletarVenda(id: string) {
    return this.prisma.venda.delete({ where: { id } });
  }
}
