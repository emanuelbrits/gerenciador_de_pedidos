// src/venda/dto/create-venda.dto.ts
import { IsArray, IsNumber, IsNotEmpty, ValidateNested, isString, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class VendaProdutoDto {
  @IsString()
  id_produto: string;

  @IsNumber()
  qtd: number;

  @IsNumber()
  preco_unitario: number;
}

export class CreateVendaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VendaProdutoDto)
  itens: VendaProdutoDto[];
  @IsString()
  cliente: string;
}