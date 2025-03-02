import TopBar from "../../components/TopBar";
import fundo_login from '../../assets/fundo_login.jpg';
import ProdutoCard from "./hooks/produtoCard";
import { useEffect, useState } from "react";
import fetchProdutos from "./hooks/hooksProdutos";

const Produtos = () => {
    const [produtos, setProdutos] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setProdutos(await fetchProdutos.fetchProdutos());
        };
        fetchData();
    }, []);

    const handleAdicionarProduto = (novoProduto: any) => {
        setProdutos([...produtos, novoProduto]);
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
                <ProdutoCard produtos={produtos} onAdicionarProduto={handleAdicionarProduto} />
            </div>
        </div>
    );
};

export default Produtos;
