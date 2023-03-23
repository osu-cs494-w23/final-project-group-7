import './App.css';
import ChampionComp from './pages/championComp';
import NotFound from './pages/notFound';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SummonerComp from './pages/summonerComp';


function AppFooter() {
  return (
    <footer classname = 'footerStyles'>
      <p>&copy; Team 7</p>
    </footer>
  );
}

function App() {
  
  return (
    <div className ="background">
    <>
      <Navbar/>
      <Routes>
        <Route path="/championCompare" element={<ChampionComp/>}/>
        <Route path="/summonerCompare" element={<SummonerComp/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
    <AppFooter />
    </div>
  );
}

export default App;
