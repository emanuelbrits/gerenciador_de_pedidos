import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Prisma, Produto } from '@prisma/client';
import { ApiKeyGuard } from 'src/api-key-guard/api-key.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @UseInterceptors(FileInterceptor('file'))
  async criarProduto(
    @Body() data: Prisma.ProdutoCreateInput,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.produtosService.criarProduto(data, file);
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