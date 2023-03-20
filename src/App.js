import logo from './logo.svg';
import './App.css';
import ChampionComp from './pages/championComp';
import NotFound from './pages/notFound';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/championCompare" element={<ChampionComp/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
