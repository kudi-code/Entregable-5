
import React, { useState } from "react";
import "../styles/navbar.css";
import { getCartThunk, loginThunk } from "../redux/actions";
import { useDispatch } from "react-redux";
import MyFavourites from "./MyFavourites";
import { Link } from "react-router-dom";
import "../styles/login.css";



const NavBar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError , setLoginError] = useState("")

  const [isProducts , setIsProducts] = useState(false)

  const dispatch = useDispatch()
  // console.log(isProducts)

  const openCart = () => {
    setIsProducts(!isProducts)
    dispatch(getCartThunk());
    // console.log(isProducts)
  };

  

  const login = (e) => {
    e.preventDefault();
    const credentials = { email, password };
    dispatch(loginThunk(credentials))
      .then((res) => {
          localStorage.setItem("token", res.data.data.token)
          // console.log(res.data)
          setLoginError("")
          setIsLoginOpen(false)
      })
      .catch(error => {
        setIsLoginOpen(error.response.data.detail)
      })
  };

  return (
    <div className="navbar">
      <nav>
        <Link to={`/`}><strong>e-commerce</strong></Link>
        {/* User */}
        <button onClick={() => setIsLoginOpen(!isLoginOpen)}><i className="fas fa-user"></i></button>
        {/* Cart */}
        <button onClick={openCart}><i className="fas fa-shopping-cart"></i></button>
        
      </nav>

      <form onSubmit={login} className={`login ${isLoginOpen ? "open" : ""}`}>
         {
             localStorage.getItem("token") ? (
                <button onClick={() => {localStorage.setItem("token","")
                                        setIsLoginOpen(false)}
                                      } type="button">
                  Log Out
                </button>
             ) : (
              <div id="login">
              <span>User</span> <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email" /> <br />
                <span>Password</span> <br />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password" /> <br />
                  <button>Submit</button>
                {loginError}
              </div>
        
             )

         } 
        
      </form>
      <MyFavourites isOpen ={isProducts}></MyFavourites>

    </div>
  );
};

export default NavBar;
