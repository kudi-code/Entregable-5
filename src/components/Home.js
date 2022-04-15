import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsThunk,getCategoriesThunk, addCartThunk} from "../redux/actions";
import NavBar from "./NavBar";
import "../styles/cards.css"
import "../styles/search.css"
import "../styles/categories.css"



// import ProductDetail from "./ProductDetail";


const Home = () => {
    const dispatch = useDispatch()   
    const products = useSelector(state => state.products)
    //Setea los productos ahora categorizados
    const [productscategorized, setProductsCategorized] = useState(products)


    const categories = useSelector(state => state.categories)

    const [title, setTitle] = useState("")

    
    // console.log(products)

    // console.log(products)

      const filterProducts= (id) =>  {
        setProductsCategorized(products.filter(product => product.category.id === id))
      }

      useEffect(() => {
        setProductsCategorized(products)
      }, [products])
    useEffect(() => {
        dispatch(getProductsThunk())
        dispatch(getCategoriesThunk())
    }, [dispatch])
    //Terminar esta funcion
    const searchProduct = e => {
      e.preventDefault()
      setProductsCategorized(products.filter(product => product.title.search(title) !== -1))
      console.log(products.filter(product => product.title.search(title) !== -1))
    }

    const addCart = (id) => {
      const product = {
          id,
          quantity: 1
      }
      dispatch(addCartThunk(product))
  }

  return (
    <div>
      <NavBar></NavBar>
      <form onSubmit={searchProduct}>
        <input type="text"
        placeholder="Type for search products"
        value={title}
        onChange= {e => setTitle(e.target.value)}
        id="search" />
        {/* Search */}
        <button className="search--button"><i className="fas fa-search"></i></button>      
      </form>
      <section id="categories">
        <h3>Categories</h3>
      {
            categories.map(category => {
                return(                  
                  <button 
                  key={category.id}
                  onClick={()=> filterProducts(category.id)}  
                  >
                    {category.name}
                  </button>                  
                )
            })
        }
      </section>
      {
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

export default Home;