import Action from '../actions';

var initialState = {
    CusData: [],
};

function Customer(state = initialState, action) {

    switch (action.type) {
        case Action.Set_Customer_Data:
            return { ...state, CusData: action.CusData };
        default:
            return state;
    }

}

export default Customer;