import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProductThunk } from "../redux/actions";
import "../styles/favourites.css";



const MyFavourites = ({isOpen}) => {

    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // console.log(cart)
    
    return (
        <div className={`favorites-modal ${isOpen ? "open" : "close"}`}>
          {
            localStorage.getItem("token")==="" ? <span>You must login</span> : <span>Cart</span>
          }
      <div className="favorites-list">
        {cart.map((product) => (
          <div key={product.id}>
            {/* {console.log(product)} */}
            <h3 onClick={() => navigate(`/product/${product.id}`)}>
              {product.title}
            </h3>
            <p>Quantity: {product.productsInCart.quantity}</p>
            <img src={product.productImg} alt="" />
            <button onClick={() => dispatch(deleteProductThunk(product.id))}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>    
  );
};

export default MyFavourites;