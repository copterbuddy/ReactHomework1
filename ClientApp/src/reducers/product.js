import Action from '../actions';

var initialState = {
    productList: [],
    productID: 0,
    // cartStoreItem: [],
    // cartStoreStatus: false
};

function Product(state = initialState, action) {

    switch (action.type) {
        case Action.Set_Product_List:
            return { ...state, productList: action.ProductList };
        case Action.Set_Product_ID:
            return { ...state, productID: action.ProductID };
        // case Action.Set_Cart_Store_Item:
        //     return { ...state, cartStoreItem: action.cartStoreItem };
        // case Action.Set_Cart_Store_Status:
        //     return { ...state, cartStoreStatus: action.cartStoreStatus };
        default:
            return state;
    }

}

export default Product;