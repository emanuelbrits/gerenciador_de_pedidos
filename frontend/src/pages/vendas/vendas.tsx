import TopBar from "../../components/TopBar"
import fundo_login from '../../assets/fundo_login.jpg';
import { useEffect, useState } from "react";
import fetchVendas from "./hooks/hooksVendas";
import VendaCard from "./components/vendaCard";

const Vendas = () => {
    const [vendas, setVendas] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vendasData = await fetchVendas.fetchVendas();
                setVendas(vendasData);
            } catch (error) {
                console.error("Erro ao buscar vendas:", error);
            }
        };
        fetchData();
    }, []);

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
                <VendaCard vendas={vendas} />
            </div>
        </div>
    );
};

export default Vendas;