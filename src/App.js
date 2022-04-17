import { useSelector } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import ProductDetail from './components/ProductDetail';
import LoadingScreen from "./components/LoadingScreen";
import Home from "./components/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CartPage from "./components/CartPage";
import Buy from "./components/Buy";
import Purchases from "./components/Purchases";

import './App.css';

function App() {
  const isLoading = useSelector((state) => state.isLoading);


  return (
    <div className="App">
     <HashRouter>
     {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route element={<ProtectedRoutes/>}>
          {/* Rutas Protegidas          */}
          <Route path="/cart" element={<CartPage />} />
        </Route>        
        <Route element={<ProtectedRoutes/>}>
          <Route path="/buy" element={<Buy />} />  
        </Route>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/purchases" element={<Purchases />} />   
        </Route>
      </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
