'use strict';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'es6-promise';
import 'whatwg-fetch';
import 'formdata-polyfill';
import 'nodelist-foreach-polyfill';

import phoneList from './modules/phoneList';
import popUpMenu from './modules/popUpMenu';
import popupRepairTypes from './modules/popupRepairTypes';
import phoneMask from './modules/phoneMask';
import popupPrivacy from './modules/popupPrivacy';
import formula from './modules/formula';
import repareTypes from './modules/repairTypes';
import portfolio from './modules/portfolio';

document.addEventListener('DOMContentLoaded', () => {
    phoneList();
    popUpMenu();
    popupRepairTypes();
    phoneMask();
    popupPrivacy();
    formula();
    repareTypes();
    portfolio();
});