import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InfiniteScroll from 'components/InfinityScroll/InfiniteScroll'; // Importar el componente InfiniteScroll

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Navigate to= 'auth/login' />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/register" element={<Register />} />

      <Route path='*' element={<div>Not found</div>}/>
    </Routes>
   </Router>
  )

  return (
    <div className="App">
      <InfiniteScroll />
    </div>
  );
}

export default App
