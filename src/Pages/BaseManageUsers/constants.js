import {Footage_Title, Plan_Title, Stairs_Title, AddOn_Title} from "../../constants/Enum";
import {generateRange, objectValuesToKeys} from "./tools";

export const HOME_ACCESS_KEY_VALUE = {
    'Key with concierge': 'Key with concierge',
    'Other': 'Other',
    'I will be home': 'I will be home',
};
export const TIME_INITIAL_CLEANING_KEY_VALUE = {
    'Early Morning': 'Early Morning',
    'Late Morning': 'Late Morning',
};
export const TIME_ONGOING_CLEANING_KEY_VALUE = {
    'Early Morning': 'Early Morning',
    'Late Morning': 'Late Morning',
    'Afternoon': 'Afternoon',
};
export const IS830_KEY_VALUE = {
    '-1': 'no',
    '1': 'yes',
};
export const RESOURCES_KEY_VALUE = {
    'EcoPure Offic': 'EcoPure Offic',
    'Ecopure Van': 'Ecopure Van',
    'Facebook': 'Facebook',
    'Friend Recommended': 'Friend Recommended',
    'Google Search': 'Google Search',
    'In-Network': 'In-Network',
    'Instagram': 'Instagram',
    'no': 'no',
    'Other': 'Other',
    'Saw EcoPure Van': 'Saw EcoPure Van',
    'Yelp': 'Yelp',
};
export const MEETING_POINT_TIME_KEY_VALUE = {
    '08:00-09:00': '8:00 am - 9:00 am',
    '09:00-10:00': '9:00 am - 10:00 am',
    '10:00-11:00': '10:00 am - 11:00 am',
    '11:00-12:00': '11:00 am - 12:00 pm',
    '12:00-13:00': '12:00 pm - 1:00 pm',
    '13:00-14:00': '1:00 pm - 2:00 pm',
    '14:00-15:00': '2:00 pm - 3:00 pm',
    '15:00-16:00': '3:00 pm - 4:00 pm',
    '16:00-17:00': '4:00 pm - 5:00 pm',
};
export const MSG_EMAIL_ALREADY_EXIST = 'This email already exist';
export const MSG_ZIPCODE_NOT_SUPPORTED = 'This Zip Code Does Not Supported by your Locations';

export const FIELD_TITLE = {
    id:'Id',
    registration_date:'Registration date',
    date_last_email:'Date last email',
    validation_status:'Validation status',
    email_counter:'Email counter',
    last_adm_message_id:'Last adm message_id',
    status:'Status',
    num_adults:'Num adults',
    num_pets:'Num pets',
    active_message_to_adm:'Active message to adm',
    email_notification:'Email notification',
    daily_tuning:'Daily tuning',
    building_flag:'Building flag',
    zip_flag:'Zip flag',
    pa_flag:'Pa flag',
    home_clng_prof_flag:'Home clng prof flag',
    flight_stairs:'Flight stairs',
    token:'Session Token',

    num_br: "Bedrooms",
    num_bth: 'Bathrooms',
    footage: 'Square Footage',
    home_condition: 'Home Condition',
    num_kids: 'Kids count',
    pet_type: 'Pet type',
    start_clean_date: 'Start Cleaning Date',
    is830: 'is ok at 8:30',
    frequency: 'Frequency',
    home_access: 'Home access',
    time_initial_cleaning: 'Time initial cleaning',
    time_ongoing_cleaning: 'Time ongoing cleaning',
    'add-on-services': 'Add-On Services',
    special: 'Comments',
    'promo-code': 'Promo Code',
    'promo_code': 'Promo Code',
    meeting_point_date: 'Meeting point date',
    meeting_point_time: 'Meeting point time',
    meeting_point_start: 'Meeting point start',
    meeting_point_end: 'Meeting point end',
    cc_number: "card number",
    exp_date: "exp. date",
    cvv: "cvv",
    cc_zip: "zip",

    email: 'Email',
    first_name: 'First Name',
    last_name: 'Last Name',
    phone: 'Phone',
    resource: 'How did you find EcoPure?',
    location_id: 'Location',
    zip_code: 'Zip Code',
    building_id: 'Building',
    building_name: 'Building Name',
    address: 'Street Address',
    apt_num: 'Apartment Number',

};

export const FIELDS_DB_USER = [
    'id',
    'email',
    'first_name',
    'last_name',
    'building_name',
    'address',
    'apt_num',
    'zip_code',
    'registration_date',
    'meeting_point_start',
    'meeting_point_end',
    'date_last_email',
    'start_clean_date',
    'validation_status',
    'email_counter',
    'last_adm_message_id',
    'is830',
    'status',
    'num_adults',
    'num_kids',
    'num_pets',
    'num_br',
    'num_bth',
    'active_message_to_adm',
    'email_notification',
    'daily_tuning',
    'building_flag',
    'zip_flag',
    'pa_flag',
    'home_clng_prof_flag',
    'phone',
    'frequency',
    'pet_type',
    'home_condition',
    'home_access',
    'special',
    'promo_code',
    'resource',
    'flight_stairs',
    'token',
];


export const FIELDS_PROFILE = [
    'email',
    'first_name',
    'last_name',
    'phone',
    'resource',
];
export const FIELDS_ADDRESS = [
    'location_id',
    'zip_code',
    'building_id',
    'building_name',
    'address',
    'apt_num',
    'flight_stairs',
];
export const FIELDS_HOME = [
    'num_br',
    'num_bth',
    'footage',
    'home_condition',
    'num_kids',
    'pet_type',
];
export const FIELDS_SERVICE = [
    'start_clean_date',
    'is830',
    'frequency',
    'home_access',
    'time_initial_cleaning',
    'time_ongoing_cleaning',
];
export const FIELDS_SPECIAL = [
    'add-on-services',
    'special',
    'promo-code',
];
export const FIELDS_CALL = [
    'meeting_point_date',
    'meeting_point_time',
];
export const FIELDS_CARD = [
    'cc_number',
    'exp_date',
    'cvv',
    'cc_zip',
];

// export const ADD_ON_KEY_VALUE = objectValuesToKeys(AddOn_Title);
export const STAIRS_KEY_VALUE = objectValuesToKeys(Stairs_Title);
export const FOOTAGE_KEY_VALUE = objectValuesToKeys(Footage_Title);
export const PLAN_KEY_VALUE = objectValuesToKeys(Plan_Title);
export const NUM_BR_KEY_VALUE = {'Studio': 'Studio', ...generateRange({count: 5})};
export const NUM_BTH_KEY_VALUE = generateRange({count: 3});
export const NUM_KIDS_KEY_VALUE = generateRange({start: 0, count: 5});
export const HOME_CONDITION_KEY_VALUE = {
    'Exceptionally Clean': 'Exceptionally Clean',
    'Moderately Clean': 'Moderately Clean',
    'Very Cluttered': 'Very Cluttered',
};

