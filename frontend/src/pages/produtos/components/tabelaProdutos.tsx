import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import updateProduto from "../hooks/hooksProdutos";

interface Produto {
    id: string,
    foto: string;
    nome: string;
    precoUnitario: number;
}

interface TabelaProdutosProps {
    produtos: Produto[];
    onEditarProduto: (index: number, produtoAtualizado: Produto, novaFoto?: File) => void;
}

const TabelaProdutos = ({ produtos, onEditarProduto }: TabelaProdutosProps) => {
    const [modalAberto, setModalAberto] = useState(false);
    const [produtoAtual, setProdutoAtual] = useState<Produto | null>(null);
    const [indexAtual, setIndexAtual] = useState<number | null>(null);
    const [novaFoto, setNovaFoto] = useState<File | undefined>(undefined);

    useEffect(() => {
        if (produtoAtual?.foto) {
            carregarImagemInicial(produtoAtual.foto).then(setNovaFoto);
        }
    }, [produtoAtual]);

    const carregarImagemInicial = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], "foto_atual.jpg", { type: blob.type });
    };

    const abrirModal = (index: number) => {
        setProdutoAtual(produtos[index]);
        setIndexAtual(index);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setProdutoAtual(null);
        setIndexAtual(null);
        setNovaFoto(undefined);
    };

    const salvarAlteracoes = async () => {
        if (produtoAtual && indexAtual !== null) {
            try {
                const produtoAtualizado = await updateProduto.updateProduto(
                    {
                        nome: produtoAtual.nome,
                        precoUnitario: produtoAtual.precoUnitario,
                        id: produtoAtual.id
                    },
                    novaFoto || (produtoAtual.foto as unknown as File)
                );

                if (produtoAtualizado) {
                    // Chamando a função vinda do Produtos.tsx para atualizar a lista
                    onEditarProduto(indexAtual, {
                        ...produtoAtualizado,
                        foto: novaFoto ? URL.createObjectURL(novaFoto) : produtoAtual.foto
                    });

                    fecharModal();
                }
            } catch (error) {
                console.error("Erro ao salvar alterações:", error);
            }
        }
    };

    return (
        <>
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
                            <td>
                                <img src={produto.foto} alt="" className="max-h-30 max-w-30 p-2" />
                            </td>
                            <td>{produto.nome}</td>
                            <td>R$ {produto.precoUnitario.toFixed(2)}</td>
                            <td className="p-2">
                                <button className="btn ml-2" onClick={() => abrirModal(index)}>
                                    <MdEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalAberto && produtoAtual && (
                <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xs">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border">
                        <h2 className="flex text-xl justify-center font-bold mb-4">Editar Produto</h2>
                        <div className="flex justify-center mb-4">
                            <img src={novaFoto ? URL.createObjectURL(novaFoto) : produtoAtual.foto} alt={`Foto do ${produtoAtual.nome}`} className="max-h-40" />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="border-black w-full mb-4 bg-blue-400 text-white rounded-lg"
                            onChange={(e) => setNovaFoto(e.target.files?.[0] || undefined)}
                        />
                        <input
                            type="text"
                            className="input input-bordered border-black w-full mb-2 bg-white text-black"
                            value={produtoAtual.nome}
                            onChange={(e) => setProdutoAtual({ ...produtoAtual, nome: e.target.value })}
                        />
                        <input
                            type="number"
                            className="input input-bordered border-black w-full mb-2 bg-white text-black"
                            value={produtoAtual.precoUnitario}
                            onChange={(e) =>
                                setProdutoAtual({ ...produtoAtual, precoUnitario: parseFloat(e.target.value) })
                            }
                        />
                        <div className="flex justify-between">
                            <button className="btn btn-success" onClick={salvarAlteracoes}>
                                Salvar
                            </button>
                            <button className="btn btn-error" onClick={fecharModal}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TabelaProdutos;
