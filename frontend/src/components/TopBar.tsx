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
        <a className="text-xl font-bold">Minha Aplicação</a>
      </div>
      <div className="flex-none">
        <button className="btn bg-red-600 text-white" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default TopBar;
