import TopBar from "../../components/TopBar";
import fundo_login from '../../assets/fundo_login.jpg'

const Home = () => {
  return (
    <div>
      <TopBar />
      <div className="flex justify-center items-center min-h-screen" style={{
            backgroundImage: `url(${fundo_login})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100vw'
        }}>
      </div>
    </div>
  );
};

export default Home