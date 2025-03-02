import axios from "axios";

const fetchProdutos = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/produtos`,
        { headers: { 'x-api-key': `${import.meta.env.VITE_API_KEY}` } }
    );

    return (response.data);
};

const createProduto = async (produto: { nome: string; precoUnitario: number }, foto: File) => {
    const formData = new FormData();
    formData.append("nome", produto.nome);
    formData.append("precoUnitario", produto.precoUnitario.toString());

    if (foto) {
        formData.append("file", foto);
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/produtos`, {
            method: "POST",
            headers: {
                "x-api-key": import.meta.env.VITE_API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Erro ao adicionar produto");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao enviar produto:", error);
        alert("Erro ao adicionar produto");
    }
};

const updateProduto = async (produto: { nome: string; precoUnitario: number, id: string }, foto: File) => {
    const formData = new FormData();
    formData.append("nome", produto.nome);
    formData.append("precoUnitario", produto.precoUnitario.toString());

    if (foto) {
        formData.append("file", foto);
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/produtos/${produto.id}`, {
            method: "PUT",
            headers: {
                "x-api-key": import.meta.env.VITE_API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar produto");
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao atualizar produto");
    }
};

export default { fetchProdutos, createProduto, updateProduto };