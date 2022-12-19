import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/header/header';
import Home from './components/home/home';
import Cart from './components/cart/cart';
import Products from './components/products/products';
import Savedlist from './components/savedlist/savedlist';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import {ToastContainer} from 'react-toastify'
import Account from './components/account/account';
import Orders from './components/orders/orders';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
     <Router>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/products' element={<Products />}/>
          <Route path='/savedlist' element={<Savedlist />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
        {/* <Footer /> */}
      </div>
     </Router>
      <ToastContainer />
    </>
  );
}

export default App;
