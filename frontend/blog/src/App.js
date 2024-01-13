import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  </Router>
  );
}

export default App;
