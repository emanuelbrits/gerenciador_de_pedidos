import { useState } from "react";
import TabelaProdutos from "./tabelaProdutos";
import createProdutos from "../hooks/hooksProdutos";
import { FaPlus, FaSearch } from "react-icons/fa";

interface Produto {
    id: string;
    foto: string;
    nome: string;
    precoUnitario: number;
}

interface ProdutoCardProps {
    produtos: Produto[];
    onAdicionarProduto: (novoProduto: Produto) => void;
    onEditarProduto: (index: number, produtoAtualizado: Produto) => void; // Adicionando a prop
}

const ProdutoCard = ({ produtos, onAdicionarProduto, onEditarProduto }: ProdutoCardProps) => {
    const [showModal, setShowModal] = useState(false);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [foto, setFoto] = useState<File | null>(null);
    const [termoBusca, setTermoBusca] = useState("");

    // Função para salvar novo produto
    const handleSalvar = async () => {
        if (!nome || !preco || !foto) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoProduto = { nome, precoUnitario: parseFloat(preco) };

        const produtoCriado = await createProdutos.createProduto(novoProduto, foto);

        if (produtoCriado) {
            onAdicionarProduto(produtoCriado);
            setShowModal(false);
            setNome("");
            setPreco("");
            setFoto(null);
        }
    };

    // Filtrar produtos pelo nome digitado
    const produtosFiltrados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return (
        <div className="bg-white p-8 rounded-lg shadow-2xl text-black text-center max-w-4xl w-full max-h-[500px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                {/* Campo de busca */}
                <div className="relative w-1/2">
                    <input
                        type="text"
                        placeholder="Buscar produto..."
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        className="input input-bordered w-full pl-10 border-black bg-white text-black"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                </div>
                <button className="btn btn-info text-3xl" onClick={() => setShowModal(true)}>
                    <FaPlus />
                </button>
            </div>

            {/* Tabela de produtos filtrados */}
            <TabelaProdutos produtos={produtos} onEditarProduto={onEditarProduto} />

            {/* Modal de Adição */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xs">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border">
                        <h2 className="text-2xl mb-4">Adicionar Produto</h2>

                        <input
                            type="text"
                            placeholder="Nome do produto"
                            value={nome}
                            required
                            onChange={(e) => setNome(e.target.value)}
                            className="input input-bordered border-black w-full mb-2 bg-white text-black"
                        />

                        <input
                            type="number"
                            placeholder="Preço unitário"
                            value={preco}
                            required
                            onChange={(e) => setPreco(e.target.value)}
                            className="input input-bordered border-black w-full mb-2 bg-white text-black"
                        />

                        <span className="flex justify-start">Foto:</span>
                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => setFoto(e.target.files?.[0] || null)}
                            className="border-black w-full mb-4 bg-white text-black"
                        />

                        <div className="flex justify-between">
                            <button className="btn btn-success" onClick={handleSalvar}>
                                Salvar
                            </button>
                            <button className="btn btn-error" onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProdutoCard;
