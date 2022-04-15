import { useSelector } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import ProductDetail from './components/ProductDetail';
import Favourites from './components/MyFavourites';
import LoadingScreen from "./components/LoadingScreen";
import Home from "./components/Home";

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
          <Route path="/favorites" element={<Favourites />} />
            
      </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
