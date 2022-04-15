
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCartThunk, getProductsThunk } from "../redux/actions";
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import "../styles/slider.css"




const ProductDetail = () => {
    const dispatch = useDispatch()
    const {id} = useParams()

    const products = useSelector(state => state.products)
    

    const [productSelected, setProductSelected] = useState(null)
    const [quantity, setQuantity] = useState(0) //Cantidad del carrito
    const [img, setImg] = useState(0) //para cambiar las imágenes

    //"Jalando" los productos de la misma categoría
    const [productscategorized, setProductsCategorized] = useState([])
    
    useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch])
    //Find, encontrar el id de params
    useEffect(() => {
        setProductSelected( products.find(product => product.id === Number(id)))
        
    }, [products, id])
    // console.log(productSelected)

    useEffect(() => {
        setProductsCategorized(products.filter(product => product.category.id === productSelected?.category.id))
        
    }, [products, productSelected?.category.id])

    const addCart = () => {
        const product = {
            id,
            quantity
        }
        dispatch(addCartThunk(product))
    }
    const rightImg = () =>{
        if (img>1) setImg(0)
        else setImg(img+1)
        
    }
    const leftImg = () =>{        
        if (img<1) setImg(2)
        else setImg(img-1)
    }


    return (
        <div>
            <NavBar></NavBar>
            {/* {console.log(img)}             */}
            <h1>{productSelected?.title}</h1>            
            <div id="slider">
                <button onClick={() => leftImg()} className="slider--buttons left"><i className="fas fa-arrow-alt-circle-left"></i></button>
                {/* izquierda */}
                <button onClick={() => rightImg()} className="slider--buttons right"><i className="fas fa-arrow-alt-circle-right"></i></button>
                {/* Derecha */}
                <img src={productSelected?.productImgs[img]} alt="img" className='slider--img' />
            </div>
            <div id="information">
                <span>Price: <b>${productSelected?.price}</b> </span> <br />
                <label htmlFor="">Quantity </label>
                <button className='changePrice'
                onClick={() => setQuantity(quantity+1)}><i className="fas fa-plus"></i></button>

                <input type="text" 
                value={quantity}
                onChange={(e)=> setQuantity(e.target.value)}/>
                <button className='changePrice'
                onClick={() => {if(quantity>0)setQuantity(quantity-1)}}><i className="fas fa-minus"></i></button>
                <br />
                <button className="cart" onClick={addCart}>Add to cart</button>
                <h3>Product Details:</h3>
                <p>{productSelected?.description}</p>
            </div>
        <h3>Popular Products:</h3>
            {
                //Sugerencias
          productscategorized.map(product => {
              return(
            <div className="cards" key={product.id}>
               <Link to={`/product/${product.id}`}> {product.title}                      
                      <br />
                      <div className="div--img">
                      <img onMouseLeave={e => { e.target.src = product.productImgs[0]
                       e.target.className = "cards--img"}} 
                      onMouseOver={e => {e.target.src = product.productImgs[1]
                        e.target.className = "cards--img2"}} 
                      src={product.productImgs[0]}
                      className="cards--img" alt="" /> 
                      </div>
                      </Link>
                      <span>Price: <b>${product.price}</b> </span> <br /><br />
                      <button onClick={() => addCart(product.id)}>
                        Add to <i className="fas fa-shopping-cart"></i></button>
            </div>
              )

          })
      }
        </div>
    );
};

export default ProductDetail;