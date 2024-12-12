import './App.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './Component/Login/LoginForm';
import Home from './Component/Client/Home/Home';
import Navbar from './Component/Client/Home/Navbar';

const App = () => {
  return (
    <div>
      <div className="App">
        <LoginForm />
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