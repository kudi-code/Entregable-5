import React, { useState } from 'react';
import { getPurchasesThunk} from "../redux/actions";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import "../styles/purchases.css"



const Purchases = () => {

    const dispatch = useDispatch()
    useState(() => {
        dispatch(getPurchasesThunk());
    })    

    const purchases = useSelector(state => state.purchases)

    return (

        <div>
            <NavBar></NavBar>
            <h3>My Purchases</h3>
            {
                purchases.map(cart => {
                    return(
                        <div className='cart' key={cart.cartId}>
                            <strong>{cart.updatedAt.slice(0,10)}</strong>
                            {
                                cart.cart.products.map(product => {
                                    return(
                                        <div key={product.id}>
                                            <h3>{product.title}</h3>
                                            <span>{product.price}</span>
                                            <p>{product.productsInCart.quantity}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            {console.log(purchases)}
        </div>
    );
};

export default Purchases;