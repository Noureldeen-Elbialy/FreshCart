import axios from "axios";

const { createContext, useState } = require("react");

export let CartContext = createContext();


// store usertoken

let head = {
    token: localStorage.getItem('userToken')
}


//add product to cart

function addToCart(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
        productId: id
    }, {
        headers: head
    })
        .then((response) => response)
        .catch((error) => error);
}

//get cart to user

function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: head
    }).then((response) => response).catch((err) => err);
}

//remove product from cart 

function removeSpecificCartItems(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: head
    }).then((response) => response).catch((err) => err);
}

//update product count

function updateCount(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        count
    }, {
        headers: head
    });
}

//buying online

function buyOnline(values, cartId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { "shippingAddress": values }
        , {
            headers: head
        }).then((response) => response).catch((err) => err);
}

// create cash order

function cashOrder(values, cartId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { "shippingAddress": values },
        { headers: head }
    ).then((response) => response).catch((err) => err);
}


export default function CartContextProvider(props) {

    //get cart id
    let [cartId, setCartId] = useState(null);
    async function getCartId() {
        let { data } = await getLoggedUserCart();
        setCartId(data?.data._id)
        console.log(data?.data._id);
    }


    return <CartContext.Provider value={{ getCartId, cartId, addToCart, getLoggedUserCart, removeSpecificCartItems, updateCount, buyOnline, cashOrder, head }}>
        {props.children}
    </CartContext.Provider>
}