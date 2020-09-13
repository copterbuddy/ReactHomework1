import Action from './'

export function setCustomerData(data){
    return {
        type: Action.Set_Customer_Data,
        CusData: data
    };
}