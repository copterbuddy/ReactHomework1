import Action from './'

export function setCustomerData(data){
    return {
        type: Action.Set_Page_ID,
        cusData: data
    };
}