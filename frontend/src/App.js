import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/home/home';
import Auction from './pages/auction/auction';
import TopNav from './components/topNav/topNav';
import Admin from './pages/admin/admin';
import MyAccount from './pages/myAccount/myAccount';
import {Route,Routes} from 'react-router-dom';



function App() {
  return (
    <div>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auction" element={<Auction />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/myAccount' element={<MyAccount />}/>
      </Routes>
    </div>

  );
}

export default App;
