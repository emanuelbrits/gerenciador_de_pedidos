import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { Venda } from '@prisma/client';
import { CreateVendaDto } from './dto/create-venda.dto';
import { ApiKeyGuard } from 'src/api-key-guard/api-key.guard';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  async create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendasService.createVenda(createVendaDto);
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  listar() {
    return this.vendasService.listarVendas();
  }

  @Get(':id')
  @UseGuards(ApiKeyGuard)
  obter(@Param('id') id: string) {
    return this.vendasService.obterVendaPorId(id);
  }

  @Put(':id')
  @UseGuards(ApiKeyGuard)
  atualizar(@Param('id') id: string, @Body() data: Venda) {
    return this.vendasService.atualizarVenda(id, data);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  deletar(@Param('id') id: string) {
    return this.vendasService.deletarVenda(id);
  }
}
