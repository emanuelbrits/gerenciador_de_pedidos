import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from '@prisma/client';
import { ApiKeyGuard } from 'src/api-key-guard/api-key.guard';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  criar(@Body() data: Produto) {
    return this.produtosService.criarProduto(data);
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  listar() {
    return this.produtosService.listarProdutos();
  }

  @Get(':id')
  @UseGuards(ApiKeyGuard)
  obter(@Param('id') id: string) {
    return this.produtosService.obterProdutoPorId(id);
  }

  @Put(':id')
  @UseGuards(ApiKeyGuard)
  atualizar(@Param('id') id: string, @Body() data: Produto) {
    return this.produtosService.atualizarProduto(id, data);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  deletar(@Param('id') id: string) {
    return this.produtosService.deletarProduto(id);
  }
}
