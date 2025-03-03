import { useNavigate } from "react-router-dom";

interface Venda {
    id: String;
    data: Date;
    total: Number;
    cliente: String;
}

interface TabelaVendasProps {
    vendas: Venda[];
}

const formatarDataBR = (dataISO: string) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(',', '');
};

const TabelaVendas = ({ vendas }: TabelaVendasProps) => {

    const navigate = useNavigate();
    
    return (
        <table className="w-full border-collapse">
            <thead className="border-b">
                <tr>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th className="w-80">Data</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {vendas.map((venda, index) => (
                    <tr key={index} className="border-b">
                        <td>{venda.cliente}</td>
                        <td>R$ {venda.total.toFixed(2)}</td>
                        <td>{formatarDataBR(venda.data.toString())}</td>
                        <td><button className="btn btn-info m-2" onClick={() => navigate(`/vendas/${venda.id}`)}>Ver venda</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TabelaVendas;