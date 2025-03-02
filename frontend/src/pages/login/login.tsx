import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import fundo_login from '../../assets/fundo_login.jpg'

interface LoginProps {
    setAuth: (auth: boolean) => void;
}

const Login = ({ setAuth }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,
                { email, password },
                { headers: { 'x-api-key': `${import.meta.env.VITE_API_KEY}`} }
            );

            localStorage.setItem('token', response.data.access_token);
            setAuth(true);
            navigate('/home');
        } catch (err) {
            setError('Login falhou. Verifique suas credenciais.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen" style={{
            backgroundImage: `url(${fundo_login})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100vw'
        }}>
            <div className="card w-96 bg-transparent shadow-xl p-5">
                <div className='flex justify-center text-white text-8xl text-center p-2 mb-16'>
                    <FaShoppingCart />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-3">
                    <input type="email" className="input input-bordered w-full mb-6 bg-transparent" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="input input-bordered w-full mb-6 bg-transparent" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="btn btn-primary w-full bg-linear-to-t from-sky-500 to-indigo-500">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
