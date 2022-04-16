//Action generator
//1. Declarar el actions
//2 Hacer el case

import axios from "axios"

// import { type } from "@testing-library/user-event/dist/type"

//3. Hacer la fucnión
export const actions = {
    setproducts: "SET_PRODUCTS",
    setloading: "SET_LOADING",
    setcategories: "SET_CATEGORIES",
    setcart: "SET_CART",
    setpurchases: "SET_PURCHASES"
}

const getConfig = () => ({ //Obtener el token de LocalSotorage
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const setloading = (loading) => ({
    type: actions.setloading,
    payload: loading
})

export const setProducts = (products) => ({
    type: actions.setproducts,
    payload: products
})

export const setCategories = (categories) => ({
    type: actions.setcategories,
    payload: categories
})

export const setCart = (cart) => ({
    type: actions.setcart,
    payload: cart
})
export const setPurchases = (purchases) => ({
    type: actions.setpurchases,
    payload: purchases
})


export  const getProductsThunk = () => {
    return dispatch => {
        dispatch(setloading(true))
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setloading(false)))
    }
}
//res.data.data.token

export  const getCategoriesThunk = () => {
    return dispatch => {
        dispatch(setloading(true))
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
        .then(res => dispatch(setCategories(res.data.data.categories)))
        .finally(() => dispatch(setloading(false)))
    }
}

export  const filterCategoriesThunk = (id) => {
    return dispatch => {
        dispatch(setloading(true))
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/?category=1`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setloading(false)))
    }
}

export  const filterHeadlineThunk = (headline) => { //No hace nada, era para filtrar
    return dispatch => {
        dispatch(setloading(true))
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${headline}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setloading(false)))
    }
}

export const loginThunk = (credentials) => { //Hacer login
    return dispatch => {
        dispatch(setloading(true))
        return axios
        .post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", credentials)
        .finally(() => dispatch(setloading(false)))
    }
}

export const addCartThunk = (product) => { //Añadir al carrito
    return dispatch => {
        dispatch(setloading(true))
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", product, getConfig())
        .finally(() => dispatch(setloading(false)))
    }
}

export const getCartThunk = () => { //Obtener el carrito
    return dispatch => {
        dispatch(setloading(true))
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res => 
            dispatch(setCart(res.data.data.cart.products))
            // console.log(res.data)
            )
        .catch(error => {
            if(error.response.status === 404){
                console.log("el carrito está vacío")
            }
        })
        .finally(() => dispatch(setloading(false)))
    }
}

export const deleteProductThunk = (id) => { //Borrar producto
    return dispatch => {
        dispatch(setloading(true))
        axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(res => dispatch(getCartThunk()))
        .finally(() => dispatch(setloading(false)))
    }
}

export const getPurchasesThunk = () => { //Obtener las compras
    return dispatch => {
        dispatch(setloading(true))
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then(res => {
            dispatch(setPurchases(res.data.data.purchases))}
            )
        .finally(() => dispatch(setloading(false)))
    }
}

export const purchaseThunk = (address) => { //Comprar el carrito
    return dispatch => {
        dispatch(setloading(true))
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", address, getConfig())
        .finally(() => dispatch(setloading(false)))
    }
}
