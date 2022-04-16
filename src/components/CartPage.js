import React from 'react';
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProductThunk } from "../redux/actions";


const CartPage = () => {

    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div>
            <NavBar></NavBar>
            <div className="cart-list">
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
        <button onClick={() => navigate(`/buy`)}>Purchase</button>
      </div>
    </div> 
    );
};

export default CartPage;