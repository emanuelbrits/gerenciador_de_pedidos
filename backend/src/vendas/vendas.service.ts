import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateVendaDto } from './dto/create-venda.dto';

@Injectable()
export class VendasService {
  constructor(private prisma: PrismaService) {}

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
    return this.prisma.$transaction([
      this.prisma.vendaProduto.deleteMany({ where: { vendaId: id } }), // Exclui os itens da venda
      this.prisma.venda.delete({ where: { id } }) // Agora exclui a venda
    ]);
  }  

  async createVenda(data: CreateVendaDto) {
    return this.prisma.$transaction(async (prisma) => {
      // Calcula o total da venda
      const total = data.itens.reduce((acc, item) => acc + item.preco_unitario * item.qtd, 0);

      // Cria a venda
      const venda = await prisma.venda.create({
        data: {
          data: new Date(),
          total,
          cliente: data.cliente
        },
      });

      // Insere os produtos relacionados
      const vendaProdutos = data.itens.map((item) => ({
        vendaId: String(venda.id), // Converte para string
        produtoId: String(item.id_produto), // Converte para string
        qtd: item.qtd,
        precoUnitario: item.preco_unitario,
        foto: item.foto,
      }));
      
      await prisma.vendaProduto.createMany({
        data: vendaProdutos,
      });

      return { message: 'Venda cadastrada com sucesso!', venda };
    });
  }
}
