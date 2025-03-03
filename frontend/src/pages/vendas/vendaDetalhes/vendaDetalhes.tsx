import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TopBar from "../../../components/TopBar";
import fundo_login from '../../../assets/fundo_login.jpg';
import { FaTrash } from "react-icons/fa";
import deleteVenda from "../hooks/hooksVendas";

const VendaDetalhes = () => {
    const { id } = useParams(); // Captura o ID da venda da URL
    const [venda, setVenda] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenda = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/vendas/${id}`, {
                    headers: { "x-api-key": import.meta.env.VITE_API_KEY },
                });
                setVenda(response.data);
            } catch (err) {
                setError("Erro ao carregar os detalhes do pedido.");
            } finally {
                setLoading(false);
            }
        };

        fetchVenda();
    }, [id]);

    const removerVenda = async (id: string) => {
            const confirmacao = window.confirm("Deseja realmente excluir esta venda?");
    
            if (confirmacao) {
                try {
                    const vendaRemovida = await deleteVenda.deleteVenda(id);
                    navigate("/vendas");
                    return vendaRemovida;
                } catch (error) {
                    console.error("Erro ao remover venda:", error);
                }
            }
        }

    if (loading) return <p>Carregando detalhes do pedido...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!venda) return <p>Pedido não encontrado.</p>;

    return (
        <><TopBar /><div
            className="flex justify-center items-center min-h-screen"
            style={{
                backgroundImage: `url(${fundo_login})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100vw'
            }}
        >
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-4">Detalhes do Pedido</h1>
                    <button className="btn btn-error" onClick={() => removerVenda(venda.id)}>
                        <FaTrash />
                    </button>
                </div>

                <div className="mb-4">
                    <p><strong>Cliente:</strong> {venda.cliente}</p>
                    <p><strong>Data:</strong> {new Date(venda.data).toLocaleString()}</p>
                </div>

                <h2 className="text-xl font-semibold mt-4 mb-2">Itens Comprados</h2>
                <ul className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    {venda.produtos.map((item: any, index: number) => (
                        <li key={index} className="flex items-center justify-between border-b last:border-0 py-2">
                            <img src={item.foto} alt={item.nome} className="w-16 h-16 object-cover rounded" />
                            <span>{item.nome}</span>
                            <span className="ml-2">Qtd: {item.qtd}</span>
                            <span className="ml-2">R$ {item.precoUnitario.toFixed(2)}</span>
                            <span className="font-bold ml-2">Total: R$ {(item.qtd * item.precoUnitario).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-4 text-lg font-bold">
                    Total da Venda: R$ {venda.produtos.reduce((acc: number, item: any) => acc + item.qtd * item.precoUnitario, 0).toFixed(2)}
                </div>
            </div>
        </div></>
    );
};

export default VendaDetalhes;
