import Action from '../actions';

var initialState = {
    pageID: 0,
    topTxt: 'H.I.S. Service'
};

function Page(state = initialState,action){

    switch (action.type) {
        case Action.Set_Page_ID:
            return {...state, pageID: action.pageID};
        default:
            return state;
    }

}

export default Page;