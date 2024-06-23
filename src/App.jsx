import './styles/App.css'
import { 
	BrowserRouter as Router, 
	Routes, 
	Route,
	Navigate } from 'react-router-dom';

  import Login from './pages/Login';
  import Register from './pages/Register';
  import {NotFound} from './pages/NotFound';
  import Dashboard from './pages/Dashboard';
  import ClientDashboard from "./pages/ClientDashboard.jsx";
  import Cart from "./pages/Cart.jsx";
  import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login"/>} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path ="/clientdashboard" element={<ClientDashboard/>} />
          <Route path ="/admindashboard" element={<AdminDashboard/>} />
            <Route path="/cart/:username" element={<Cart  userId={ClientDashboard.username}/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
