import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { Venda } from '@prisma/client';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  criar(@Body() data: Venda) {
    return this.vendasService.criarVenda(data);
  }

  @Get()
  listar() {
    return this.vendasService.listarVendas();
  }

  @Get(':id')
  obter(@Param('id') id: string) {
    return this.vendasService.obterVendaPorId(id);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() data: Venda) {
    return this.vendasService.atualizarVenda(id, data);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.vendasService.deletarVenda(id);
  }
}
