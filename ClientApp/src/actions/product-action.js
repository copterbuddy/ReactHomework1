import Action from './'

export function setProductList(data){
    return {
        type: Action.Set_Product_List,
        ProductList: data
    };
}

export function setProductID(data){
    return {
        type: Action.Set_Product_ID,
        ProductID: data
    };
}

// export function setCartStoreItem(data){
//     return {
//         type: Action.Set_Cart_Store_Item,
//         cartStoreItem: data
//     };
// }

// export function setCartStoreStatus(data){
//     return {
//         type: Action.Set_Cart_Store_Status,
//         cartStoreStatus: data
//     };
// }