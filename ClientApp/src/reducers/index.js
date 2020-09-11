import {combineReducers} from 'redux';

import Page from './page';
import Product from './product'
import Customer from './customer'

export default combineReducers({

    Product: Product,
    Page: Page,
    Customer: Customer,

});