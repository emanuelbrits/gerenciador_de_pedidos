import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from '@prisma/client';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  criar(@Body() data: Produto) {
    return this.produtosService.criarProduto(data);
  }

  @Get()
  listar() {
    return this.produtosService.listarProdutos();
  }

  @Get(':id')
  obter(@Param('id') id: string) {
    return this.produtosService.obterProdutoPorId(id);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() data: Produto) {
    return this.produtosService.atualizarProduto(id, data);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.produtosService.deletarProduto(id);
  }
}
