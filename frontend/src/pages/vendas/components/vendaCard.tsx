import { FaPlus } from "react-icons/fa";
import TabelaVendas from "./tabelaVendas";
import { useNavigate } from "react-router-dom";

interface Venda {
    id: String;
    data: Date;
    total: Number;
    cliente: String;
}

interface VendaCardProps {
    vendas: Venda[];
}

const VendaCard = ({ vendas }: VendaCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-8 rounded-lg shadow-2xl text-black text-center max-w-4xl w-full max-h-[500px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <button className="btn btn-info text-3xl" onClick={() => navigate("/addVenda")}>
                <FaPlus /> Cadastrar Venda
                </button>
            </div>
            <TabelaVendas vendas={vendas} />
        </div>
    );
}

export default VendaCard;