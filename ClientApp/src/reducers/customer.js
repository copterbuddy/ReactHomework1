import Action from '../actions';

var initialState = {
    cusData: []
};

function Customer(state = initialState,action){

    switch (action.type) {
        case Action.Set_Cus_Data:
            return {...state, cusData: action.CusData};
        default:
            return state;
    }

}

export default Customer;