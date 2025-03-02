import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProdutosService {
  private supabase;

  constructor(private prisma: PrismaService, private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL') || '',
      this.configService.get<string>('SUPABASE_KEY') || '',
    );
  }

  async criarProduto(data: Prisma.ProdutoCreateInput, file?: Express.Multer.File) {

    let imageUrl: string | null = null;

    if (file) {
      imageUrl = await this.uploadImagem(file);
    }

    return this.prisma.produto.create({
      data: {
        ...data,
        precoUnitario: parseFloat(data.precoUnitario as unknown as string),
        foto: imageUrl
      },
    });
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

  async atualizarProduto(id: string, data: Prisma.ProdutoUpdateInput, file?: Express.Multer.File) {
    let imageUrl = data.foto as string | null | undefined;

    if (file) {
      imageUrl = await this.uploadImagem(file);
    }

    return this.prisma.produto.update({
      where: { id },
      data: { ...data, foto: imageUrl },
    });
  }

  async deletarProduto(id: string) {
    return this.prisma.produto.delete({ where: { id } });
  }

  async uploadImagem(file: Express.Multer.File): Promise<string | null> {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Gera um número de 4 dígitos aleatório
    const fileName = `${file.originalname.split('.')[0]}-${randomNumber}.${file.originalname.split('.').pop()}`;

    const { data, error } = await this.supabase.storage
      .from('produtos_imagens')  // Nome do bucket
      .upload(`produtos/${fileName}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error('Erro ao fazer upload:', error.message);
      return null;
    }

    const { data: publicUrlData } = this.supabase
      .storage
      .from('produtos_imagens')
      .getPublicUrl(`produtos/${fileName}`);

    return publicUrlData.publicUrl;
  }

}