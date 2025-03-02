import { MdEdit } from "react-icons/md";

interface Produto {
    foto: string;
    nome: string;
    precoUnitario: number;
}

interface TabelaProdutosProps {
    produtos: Produto[];
}

const TabelaProdutos = ({ produtos }: TabelaProdutosProps) => {
    return (
        <table className="w-full border-collapse">
            <thead className="border-b">
                <tr>
                    <th></th>
                    <th className="w-80">Nome</th>
                    <th>Preço</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {produtos.map((produto, index) => (
                    <tr key={index} className="border-b">
                        <td><img src={produto.foto} alt="" className="max-h-30 max-w-30 p-2" /></td>
                        <td>{produto.nome}</td>
                        <td>R$ {produto.precoUnitario}</td>
                        <td className="p-2">
                            <button className="btn ml-2"><MdEdit /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TabelaProdutos;
