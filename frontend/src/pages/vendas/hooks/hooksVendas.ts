import axios from "axios";

interface Produto {
    id_produto: string,
    qtd: number,
    preco_unitario: number;
    foto: string;
}

const fetchVendas = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/vendas`, {
        headers: { 'x-api-key': import.meta.env.VITE_API_KEY }
    });

    return response.data.sort((a: { data: string | number | Date; }, b: { data: string | number | Date; }) => new Date(b.data).getTime() - new Date(a.data).getTime());
};


const createVenda = async (venda: { cliente: string; itens: Produto[], data: string }) => {
    try {
        const vendaCorrigida = {
            cliente: venda.cliente,
            itens: venda.itens.map(produto => ({
                id_produto: produto.id_produto,  // Corrigindo o nome do campo
                qtd: produto.qtd,
                preco_unitario: produto.preco_unitario,  // Garantindo que é número
                foto: produto.foto
            })),
            data: venda.data
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/vendas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Adicionando Content-Type
                "x-api-key": import.meta.env.VITE_API_KEY,
            },
            body: JSON.stringify(vendaCorrigida),
        });

        if (!response.ok) {
            const errorResponse = await response.json(); // Pegando a mensagem de erro detalhada
            throw new Error(errorResponse.message || "Erro ao adicionar venda");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao enviar venda:", error);
        alert(error || "Erro ao adicionar venda");
    }
};

const deleteVenda = async (id: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/vendas/${id}`, {
            method: "DELETE",
            headers: {
                "x-api-key": import.meta.env.VITE_API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir venda");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao excluir venda:", error);
        alert("Erro ao excluir venda");
    }
};

export default { fetchVendas, createVenda, deleteVenda };