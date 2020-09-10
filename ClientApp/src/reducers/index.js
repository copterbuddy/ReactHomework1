import {combineReducers} from 'redux';

import Page from './page';
import Product from './product'

export default combineReducers({

    Product: Product,
    Page: Page

});