import TopBar from "../../components/TopBar";
import fundo_login from '../../assets/fundo_login.jpg';
import ProdutoCard from "./components/produtoCard";
import { useEffect, useState } from "react";
import fetchProdutos from "./hooks/hooksProdutos";

const Produtos = () => {
    const [produtos, setProdutos] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const produtosData = await fetchProdutos.fetchProdutos();
                setProdutos(produtosData);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        fetchData();
    }, []);

    const handleAdicionarProduto = (novoProduto: any) => {
        setProdutos((prevProdutos) => [...prevProdutos, novoProduto]);
    };

    const handleEditarProduto = (index: number, produtoAtualizado: any) => {
        setProdutos((prevProdutos) => {
            const novosProdutos = [...prevProdutos];
            novosProdutos[index] = produtoAtualizado;
            return novosProdutos;
        });
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
                <ProdutoCard produtos={produtos} onAdicionarProduto={handleAdicionarProduto} onEditarProduto={handleEditarProduto} />
            </div>
        </div>
    );
};

export default Produtos;
