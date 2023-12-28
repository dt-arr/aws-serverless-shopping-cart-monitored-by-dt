import {
    postCart,
    getCart,
    getProducts,
    cartMigrate,
    putCart,
    cartCheckout
} from "@/backend/api.js"

import router from '@/router'

const setLoading = ({
    commit
}, payload) => {
    commit("setLoading", {value: payload.value,
    message: payload.message})
}

const fetchProducts = ({
    commit
}) => {
    getProducts().then((response) => {
        commit("setUpProducts", response.products);
    });
}
const fetchCart = ({
    commit
}) => {
    commit("setLoading", {value: true})
    getCart()
        .then((response) => {
            commit("setUpCart", response.products)
            commit("setLoading", {value: false})
        })
}
const addToCart = ({
    commit
}, obj) => {
    commit("setProductLoading", {
        "product": obj,
        "value": true,
        "btn": "add"
    })
    postCart(obj)
        .then((response) => {
            commit("setCartLoading", 1)
            commit("addToCart", response.productId);
            commit("setProductLoading", {
                "product": obj,
                "value": false,
                "btn": "add"
            })
            setTimeout(() => {
                commit("setCartLoading", -1)
            }, 500)
        }).catch(() => {
            commit("setProductLoading", {
                "product": obj,
                "value": false,
                "btn": "add"
            })
        });
}
const removeFromCart = ({
    commit
}, obj) => {
    commit("setProductLoading", {
        "product": obj,
        "value": true,
        "btn": "remove"
    })
    postCart(obj, -1)
        .then((response) => {
            commit("setCartLoading", 1)
            commit("removeFromCart", response.productId)
            commit("setProductLoading", {
                "product": obj,
                "value": false,
                "btn": "remove"
            })
            setTimeout(() => {
                commit("setCartLoading", -1)
            }, 500)
        }).catch(() => {
            commit("setProductLoading", {
                "product": obj,
                "value": false,
                "btn": "remove"
            })
        })
}
const updateCart = ({
    commit
}, obj) => {
    putCart(obj.product, obj.quantity)
        .then((response) => {
            commit("setCartLoading", 1)
            commit("updateCart", response)
            setTimeout(() => {
                commit("setCartLoading", -1)
            }, 500)
        })
}
const migrateCart = ({
    commit
}) => {
    commit("setLoading", {value: true})
    cartMigrate()
        .then((response) => {
            commit("setUpCart", response.products)
            commit("setLoading", {value: false})
        })
}


const checkoutCart = ({ commit, state }) => {
    // Calculate the total value of the cart and gather product details
    const cartDetails = state.cart.map(product => ({
        ProductName: product.productDetail.name,
        ProductCategory: product.productDetail.category,
        //ProductId:product.productDetail.productId,
        quantity: product.quantity,
        priceInCents: product.productDetail.price,
        priceInDollars: (product.productDetail.price / 100).toFixed(2), // Ensure 2 decimal places

    }));

    const totalValueInCents = cartDetails.reduce((total, product) => {
        return total + product.quantity * product.priceInCents;
    }, 0);

    const totalValueInDollars = cartDetails.reduce((total, product) => {
        return total + product.quantity * product.priceInDollars;
    }, 0);
    
    // Send business event to Dynatrace
    const dynatraceAttributes = {
        "event.name": "Checkout",
        "totalValueInCents": totalValueInCents,
        "totalValueInDollars": totalValueInDollars,
        "currency": "USD",  // Assuming the currency is USD
        "products": cartDetails,
        // Add additional attributes as needed
    };

    // Replace the placeholder with the actual Dynatrace object and event name
    dynatrace.sendBizEvent('com.serverlessshopping.checkout', dynatraceAttributes);

    // Proceed with the checkout process
    commit("setLoading", { value: true, message: "This is where we'd handle payment before clearing the cart..." });

    // Simulate checkout process
    cartCheckout()
        .then(() => {
            commit("setUpCart", []);
            setTimeout(() => { commit("setLoading", { value: false }); }, 3000);
            setTimeout(() => { router.push("/"); }, 3200);
        });
};



export default {
    setLoading,
    fetchCart,
    fetchProducts,
    migrateCart,
    updateCart,
    removeFromCart,
    addToCart,
    checkoutCart
}
