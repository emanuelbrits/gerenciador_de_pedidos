import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div className="navbar bg-linear-to-l from-sky-700 to-sky-500 shadow-md px-4 fixed">
      <div className="flex-1">
        <button className="text-4xl font-bold" onClick={() => navigate("/")}>
          <MdHome />
        </button>
      </div>
      <div className="flex-none">
        <button className="btn bg-amber-600 text-white mr-2" onClick={() => navigate("/produtos")}>
          Produtos
        </button>
        <button className="btn bg-green-600 text-white mr-2" onClick={() => navigate("/vendas")}>
          Vendas
        </button>
        <button className="btn bg-red-600 text-white" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default TopBar;
