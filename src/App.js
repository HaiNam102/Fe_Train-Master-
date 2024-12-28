import './App.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './Component/Login/LoginForm';
import Home from './Component/Client/Home/Home';
import Navbar from './Component/Client/Home/Navbar';
import ClientRoutes from './Component/routes/ClientRoutes';
import ChatBot from './Component/Client/ChatBot/ChatBot';
const App = () => {
  return (
    <div>
      <div className="App">
        <Home />
        <ClientRoutes />
        <ChatBot/>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </div>
    </div>


  );
}

export default App;