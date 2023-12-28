// BEGIN OF DYNATRCE USER TAG

const setUser = (state, user) => {
    if(user != null){
        dtrum.identifyUser(user.username);
        console.log(user.username);
    }
    state.user = user
}
// END OF DYNATRACE USER TAG

// ********



// EVERYTHING ELSE THAT ALREADY EXISTED:

const setUpProducts = (state, productsPayload) => {
    productsPayload.forEach((product) => {
        product.addLoading = false
        product.removeLoading = false
    })
    state.products = productsPayload;
}
const setUpCart = (state, cartPayload) => {
    state.cart = cartPayload;
}
const addToCart = (state, productId) => {
    let product = {}
    product.productDetail = state.products.find((prod) => prod.productId === productId);
    product.sk = productId
    let cartProduct = state.cart.find((prod) => prod.sk === productId);
    if (cartProduct) {
        cartProduct.quantity++;
    } else {
        state.cart.push({
            ...product,
            quantity: 1,
        });
    }
    // Send business event to Dynatrace
    const attributes = {
        "event.name": "Product Added to Cart",
        "productName": product.productDetail.name,
        "ProductCategory": product.productDetail.category,
        "quantity": 1,
        "priceInCents": product.productDetail.price,
        "priceInDollars": (product.productDetail.price / 100).toFixed(2), // Ensure 2 decimal places
        "currency": "USD",  // Assuming the currency is USD
        // Add additional attributes as needed
    };

    dynatrace.sendBizEvent('com.serverlessshopping.addToCart', attributes);
};
    

const removeFromCart = (state, productId) => {
    let product = {}
    product.productDetail = state.products[productId];
    product.sk = productId
    let cartProduct = state.cart.find((prod) => prod.sk === productId);
    cartProduct.quantity--;
}
const deleteFromCart = (state, productId) => {
    let product = state.products.find((product) => product.productId === productId);
    let cartProductIndex = state.cart.findIndex((product) => product.productId === productId);
    product.quantity = state.cart[cartProductIndex].stock;
    state.cart.splice(cartProductIndex, 1);
}
const setLoading = (state, payload) => {
    state.loading = payload.value
    state.loadingText = payload.message
}
const setCartLoading = (state, value) => {
    state.cartLoading += value
}
const setProductLoading = (state, {
    product,
    btn,
    value
}) => {
    let prod = state.products.find((prod) => prod.productId === product.productId);
    prod[btn + "Loading"] = value
}
const updateCart = (state, obj) => {
    let product = {}
    product.productDetail = state.products.find((prod) => prod.productId === obj.productId);
    product.sk = obj.productId
    let cartProduct = state.cart.find((prod) => prod.sk === obj.productId);
    if (cartProduct) {
        cartProduct.quantity = obj.quantity
    } else {
        state.cart.push({
            ...product,
            quantity: obj.quantity,
        });
    }
}

export default {
    setUser,
    setUpProducts,
    setUpCart,
    addToCart,
    removeFromCart,
    deleteFromCart,
    setLoading,
    setCartLoading,
    setProductLoading,
    updateCart
}
