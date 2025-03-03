import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TopBar from "../../../components/TopBar";
import fundo_login from '../../../assets/fundo_login.jpg';
import { FaTrash, FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";
import deleteVenda from "../hooks/hooksVendas";

const VendaDetalhes = () => {
    const { id } = useParams();
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
                await deleteVenda.deleteVenda(id);
                navigate("/vendas");
            } catch (error) {
                console.error("Erro ao remover venda:", error);
            }
        }
    };

    const gerarPDF = async () => {
        if (!venda) return;

        const pdf = new jsPDF();
        pdf.setFont("helvetica");

        // Título do documento
        pdf.setFontSize(16);
        pdf.text("Detalhes da Venda", 105, 15, { align: "center" });

        // Cliente e Data
        pdf.setFontSize(12);
        const nomeCliente = venda.cliente || "Não informado";
        const dataVenda = venda.data ? new Date(venda.data).toLocaleString() : "Data inválida";

        pdf.text(`Cliente: ${nomeCliente}`, 10, 30);
        pdf.text(`Data: ${dataVenda}`, 10, 40);

        // Cabeçalho da tabela
        let y = 50;
        pdf.setFontSize(10);
        pdf.text("Produto", 10, y);
        pdf.text("Qtd", 90, y);
        pdf.text("Preço Unitário", 110, y);
        pdf.text("Total", 160, y);

        pdf.line(10, y + 2, 200, y + 2); // Linha separadora

        // Listando produtos
        y += 10;
        for (const item of venda.produtos) {
            const nomeProduto = item.nome || "Produto sem nome";
            const quantidade = item.qtd ?? 0; // Usa 0 caso seja undefined/null
            const precoUnitario = item.precoUnitario ?? 0; // Usa 0 caso seja undefined/null
            const totalProduto = (quantidade * precoUnitario).toFixed(2);

            // Adiciona a imagem do produto
            const img = await loadImageAsBase64(item.foto);
            if (img) {
                pdf.addImage(img, "JPEG", 10, y - 5, 15, 15);
            }

            pdf.text(nomeProduto, 30, y);
            pdf.text(`${quantidade}`, 90, y);
            pdf.text(`R$ ${precoUnitario.toFixed(2)}`, 110, y);
            pdf.text(`R$ ${totalProduto}`, 160, y);
            y += 20; // Pula uma linha
        }

        // Total da Venda
        const totalVenda = venda.produtos.reduce((acc: number, item: { qtd: any; precoUnitario: any; }) => acc + (item.qtd ?? 0) * (item.precoUnitario ?? 0), 0).toFixed(2);

        pdf.setFontSize(12);
        pdf.text(`Total da Venda: R$ ${totalVenda}`, 10, y + 10);

        // Salvar o PDF
        pdf.save(`pedido_${venda.id || "desconhecido"}.pdf`);
    };

    // Função para carregar imagem como base64
    const loadImageAsBase64 = async (url: string) => {
        if (!url) return null;
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise<string | null>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Erro ao carregar imagem:", error);
            return null;
        }
    };

    if (loading) return <p>Carregando detalhes do pedido...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!venda) return <p>Pedido não encontrado.</p>;

    return (
        <>
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
                <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg text-black w-full">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4">Detalhes do Pedido</h1>
                        <div className="flex gap-2">
                            <button className="btn btn-error" onClick={() => removerVenda(venda.id)}>
                                <FaTrash />
                            </button>
                            <button className="btn btn-primary" onClick={gerarPDF}>
                                <FaFilePdf /> Baixar PDF
                            </button>
                        </div>
                    </div>

                    <div id="pedido-detalhes">
                        <div className="mb-4">
                            <p><strong>Cliente:</strong> {venda.cliente}</p>
                            <p><strong>Data:</strong> {new Date(venda.data).toLocaleString()}</p>
                        </div>

                        <h2 className="text-xl font-semibold mt-4 mb-2">Itens Comprados</h2>

                        {/* Lista de itens com rolagem */}
                        <ul className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-60 overflow-y-auto">
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
                </div>
            </div>
        </>
    );
};

export default VendaDetalhes;
