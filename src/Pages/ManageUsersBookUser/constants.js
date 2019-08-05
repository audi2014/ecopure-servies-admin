import {
    FIELDS_PROPS_CALL,
    FIELDS_PROPS_CARD,
    FIELDS_PROPS_HOME,
    FIELDS_PROPS_SERVICE,
    FIELDS_PROPS_SPECIAL
} from "../BaseManageUsers/fields";


export const INITIAL_STATE = {
    'num_br': '',
    'num_bth': '',
    'footage': '',
    'home_condition': '',
    'num_kids': '',
    'is830': '',
    'frequency': '',
    'home_access': '',
    'special': '',

    'start_clean_date': '',
    'time_initial_cleaning': '',
    'time_ongoing_cleaning': '',
    'add-on-services': [],
    'promo-code': '',
    'meeting_point_date': '',
    'meeting_point_time': '',
    //card
    'cc_number': '',
    'exp_date': '',
    'cc_zip': '',
    'cvv': '',
};

// const INITIAL_STATE = {
//     'num_br': '1',
//     'num_bth': '2',
//     'footage': '801-1000',
//     'home_condition': 'Exceptionally Clean',
//     'num_kids': '1',
//     'is830': '1',
//     'frequency': 'Move-Out',
//     'home_access': 'I will be home',
//     'special': '',
//
//     'start_clean_date': '2019-01-01',
//     'time_initial_cleaning': '2019-01-01T01:01:00',
//     'time_ongoing_cleaning': '2019-01-01T01:01:00',
//     'add-on-services': ['WINDOWS', 'OVEN'],
//     'promo-code': '',
//     'meeting_point_date': '2019-01-01',
//     'meeting_point_time': '08:00-09:00',
//     //card
//     'cc_number': '',
//     'exp_date': '',
//     'cc_zip': '',
//     'cvv': '',
// };

export const StepTitle_columns_INITIAL = {
    'Home': FIELDS_PROPS_HOME,
    'Service': FIELDS_PROPS_SERVICE,
    'Special': FIELDS_PROPS_SPECIAL,
    'Welcome Call': FIELDS_PROPS_CALL,
    'Billing': FIELDS_PROPS_CARD,
    'Confirm': [],
    'Success': [],
};

export const StepTitle_columns_SHORT = {
    'Service': FIELDS_PROPS_SERVICE,
    'Special': FIELDS_PROPS_SPECIAL,
    'Billing': FIELDS_PROPS_CARD,
    'Confirm': [],
    'Success': [],
};

export const STEP_TITLES_INITIAL = Object.keys(StepTitle_columns_INITIAL);
export const STEP_TITLES_SHORT = Object.keys(StepTitle_columns_SHORT);

