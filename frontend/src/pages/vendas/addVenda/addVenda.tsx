import TopBar from "../../../components/TopBar";
import fundo_login from '../../../assets/fundo_login.jpg';
import { useEffect, useState } from "react";
import fetchProdutos from "../../produtos/hooks/hooksProdutos";
import createVenda from "../hooks/hooksVendas";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddVenda = () => {
    const [cliente, setCliente] = useState("");
    const [produtos, setProdutos] = useState<any[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState("");
    const [produtosVenda, setProdutosVenda] = useState<any[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const carregarProdutos = async () => {
            try {
                const produtosData = await fetchProdutos.fetchProdutos();
                setProdutos(produtosData);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        carregarProdutos();
    }, []);

    const handleAdicionarProduto = () => {
        if (!produtoSelecionado) return;

        const produto = produtos.find(p => p.id === produtoSelecionado);
        if (!produto) return;

        const produtoJaAdicionado = produtosVenda.some(p => p.id === produto.id);
        if (produtoJaAdicionado) return alert("Este produto já foi adicionado.");

        setProdutosVenda([...produtosVenda, { ...produto, quantidade: 1, precoUnitario: produto.precoUnitario }]);
    };

    const handleAlterarQuantidade = (id: string, novaQuantidade: number) => {
        setProdutosVenda(produtosVenda.map(produto =>
            produto.id === id ? { ...produto, quantidade: novaQuantidade } : produto
        ));
    };

    const handleAlterarPreco = (id: string, novoPreco: number) => {
        setProdutosVenda(produtosVenda.map(produto =>
            produto.id === id ? { ...produto, precoUnitario: novoPreco } : produto
        ));
    };

    const handleRemoverProduto = (id: string) => {
        setProdutosVenda(produtosVenda.filter(produto => produto.id !== id));
    };

    const handleRegistrarVenda = async () => {
        if (!cliente || produtosVenda.length === 0) {
            alert("Preencha todos os campos antes de registrar a venda.");
            return;
        }
    
        const venda = {
            cliente,
            itens: produtosVenda.map(produto => ({
                id_produto: produto.id,
                qtd: produto.quantidade,
                preco_unitario: produto.precoUnitario,
                foto: produto.foto
            })),
            data: new Date().toISOString()
        };
    
        try {
            const vendaCriada = await createVenda.createVenda(venda);
    
            if (vendaCriada && vendaCriada.venda && vendaCriada.venda.id) {
                alert("Venda registrada com sucesso!");
    
                // Redirecionar para a página de detalhes da venda
                navigate(`/vendas/${vendaCriada.venda.id}`);
            } else {
                throw new Error("Erro ao obter o ID da venda");
            }
        } catch (error) {
            console.error("Erro ao registrar venda:", error);
            alert("Erro ao registrar venda");
        }
    };

    return (
        <div>
            <TopBar />
            <div
                className="flex justify-center items-center min-h-screen"
                style={{
                    backgroundImage: `url(${fundo_login})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    width: '100vw'
                }}
            >
                <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-black max-h-[80vh] overflow-hidden flex flex-col">
                    <h2 className="text-xl font-bold mb-4">Registrar Venda</h2>

                    <label className="block mb-2">Nome do Cliente</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md mb-4"
                        placeholder="Digite o nome do cliente"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                    />

                    <label className="block mb-2">Selecione um Produto</label>
                    <select
                        className="w-full p-2 border rounded-md mb-4"
                        value={produtoSelecionado}
                        onChange={(e) => setProdutoSelecionado(e.target.value)}
                    >
                        <option value="">Selecione um produto</option>
                        {produtos.map((produto) => (
                            <option key={produto.id} value={produto.id}>
                                {produto.nome} - R$ {produto.precoUnitario.toFixed(2)}
                            </option>
                        ))}
                    </select>

                    <button
                        className="btn btn-info w-full text-white p-2 rounded-md mb-4"
                        onClick={handleAdicionarProduto}
                    >
                        Adicionar Produto
                    </button>

                    {produtosVenda.length > 0 && (
                        <div className="mb-4 flex-1 overflow-y-auto max-h-40 border p-2 rounded-md">
                            <h3 className="text-lg font-semibold">Produtos na Venda:</h3>
                            <ul className="list-none">
                                {produtosVenda.map((produto, index) => (
                                    <li key={index} className="flex justify-between items-center mb-2 border-t">
                                        <div>
                                            {produto.nome}
                                            <div className="flex gap-2">
                                                <div>
                                                    Qtd:
                                                    <input
                                                        type="number"
                                                        className="w-16 p-1 border rounded-md"
                                                        min="1"
                                                        value={produto.quantidade}
                                                        onChange={(e) => handleAlterarQuantidade(produto.id, parseInt(e.target.value))}
                                                    />
                                                </div>
                                                <div>
                                                    R$:
                                                    <input
                                                        type="number"
                                                        className="w-20 p-1 border rounded-md"
                                                        min="0.01"
                                                        step="0.01"
                                                        value={produto.precoUnitario}
                                                        onChange={(e) => handleAlterarPreco(produto.id, parseFloat(e.target.value))}
                                                    />
                                                </div>
                                                <div className="font-semibold flex items-center">
                                                    R$ {(produto.quantidade * produto.precoUnitario).toFixed(2)}
                                                </div>
                                                <button
                                                    className="btn btn-error text-white p-1 rounded-md"
                                                    onClick={() => handleRemoverProduto(produto.id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <h2 className="font-semibold flex justify-center">Total do pedido: R$ {(produtosVenda.reduce((acc, produto) => acc + produto.quantidade * produto.precoUnitario, 0)).toFixed(2)}</h2>

                    <button
                        className="btn btn-success w-full text-white p-2 rounded-md"
                        onClick={handleRegistrarVenda}
                    >
                        Registrar Venda
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddVenda;
