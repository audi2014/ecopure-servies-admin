import {ProfileSelect, ProfileText, SplitStringCheckbox} from "../ManageUsersAddUser/components";
import {
    FootageTitle_Title,
    HomeCondition_Title,
    NumBr_Title,
    NumBth_Title,
    NumKids_Title,
    PlanTitle_Title
} from "./tools";

export const Field_Title = {
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
    meeting_point_date: 'Meeting point date',
    meeting_point_time: 'Meeting point time',
    meeting_point_start: 'Meeting point start',
    meeting_point_end: 'Meeting point end',


    cc_number: "card number",
    exp_date: "exp. date",
    cvv: "cvv",
    cc_zip: "zip",

};


export const columnsHome = [
    {
        Component: ProfileSelect,
        field: 'num_br',
        required: true,
        keyValue: NumBr_Title
    },
    {
        Component: ProfileSelect,
        field: 'num_bth',
        required: true,
        keyValue: NumBth_Title
    },
    {
        Component: ProfileSelect,
        field: 'footage',
        required: true,
        keyValue: FootageTitle_Title
    },
    {
        Component: ProfileSelect,
        field: 'home_condition',
        required: true,
        keyValue: HomeCondition_Title
    },
    {
        Component: ProfileSelect,
        field: 'num_kids',
        required: true,
        keyValue: NumKids_Title
    },
    {
        Component: ProfileText,
        field: 'pet_type',
        required: false,
    },
];
export const columnsService = [
    {
        Component: ProfileText,
        InputLabelProps: {shrink: true,},
        type: 'date',
        field: 'start_clean_date',
        required: true,
    },
    {
        Component: ProfileSelect,
        errorValue: '0',
        field: 'is830',
        required: true,
        keyValue: {
            '-1': 'no',
            '1': 'yes',
            // '0': '-',
        }
    },
    {
        Component: ProfileSelect,
        field: 'frequency',
        required: true,
        keyValue: PlanTitle_Title
    },
    {
        Component: ProfileSelect,
        field: 'home_access',
        required: true,
        keyValue: {
            'Key with concierge': 'Key with concierge',
            'Other': 'Other',
            'I will be home': 'I will be home',
        }
    },
    {
        Component: ProfileText,
        type: 'datetime-local',
        InputLabelProps: {shrink: true,},
        field: 'time_initial_cleaning',
        required: true,
    },
    {
        Component: ProfileText,
        type: 'datetime-local',
        InputLabelProps: {shrink: true,},
        field: 'time_ongoing_cleaning',
        required: true,
    },
];
export const columnsSpecial = [
    {
        Component: SplitStringCheckbox,
        field: 'add-on-services',
    },
    {
        Component: ProfileText,
        field: 'special',
        required: false,
    },
    {
        Component: ProfileText,
        field: 'promo-code',
        required: false,
    },

];
export const columnsCall = [
    {
        Component: ProfileText,
        type: 'date',
        field: 'meeting_point_date',
        InputLabelProps: {shrink: true,},
        required: true,
    },
    {
        Component: ProfileSelect,
        field: 'meeting_point_time',
        required: true,
        keyValue: {
            '08:00-09:00': '8:00 am - 9:00 am',
            '09:00-10:00': '9:00 am - 10:00 am',
            '10:00-11:00': '10:00 am - 11:00 am',
            '11:00-12:00': '11:00 am - 12:00 pm',
            '12:00-13:00': '12:00 pm - 1:00 pm',
            '13:00-14:00': '1:00 pm - 2:00 pm',
            '14:00-15:00': '2:00 pm - 3:00 pm',
            '15:00-16:00': '3:00 pm - 4:00 pm',
            '16:00-17:00': '4:00 pm - 5:00 pm',
        }
    }
];

export const columnsCard = [
    {
        Component: ProfileText,
        name: "credit-number", type: "tel", pattern: /\D/g, maxLength: "19",
        field: 'cc_number',
        required: true,
    },
    {
        Component: ProfileText,
        name: "credit-expires", type: "tel", maxLength: "7", placeholder: "MM / YY",

        field: 'exp_date',
        required: true,
    },
    {
        Component: ProfileText,
        name: "credit-cvc", type: "tel", pattern: /\D/g, maxLength: "4",
        field: 'cvv',
        required: true,
    },
    {
        Component: ProfileText,
        field: 'cc_zip',
        required: true,
    },
];

export const StepTitle_columns = {
    'Home': columnsHome,
    'Service': columnsService,
    'Special': columnsSpecial,
    'Welcome Call': columnsCall,
    'Billing': columnsCard,
    'Confirm': [],
    'Success':[],
};

export const STEP_TITLES = Object.keys(StepTitle_columns);


// //calculable
// //(legacy) num_adults: "1",
// //(legacy) num_pets: "0",
// //(legacy) daily_tuning: "0",
//
//
// const state = {
//     step: 1,
//     detailsHome: {
//         num_br: 0,
//         num_bth: 1,
//         footage: "",
//         home_condition: "",
//         num_kids: "",
//         pet_type: "",
//     },
//     detailsService: {
//         start_clean_date: "",
//         is830: "",	// Are you okay with 08:30AM service?
//         frequency: "",
//         home_access: "",
//         time_initial_cleaning: "",
//         time_ongoing_cleaning: "",
//     },
//     detailsSpecial: {
//         //calculable
//         'add-on-services': [],
//         special: "",
//         'promo-code': "",
//     },
//     call: {
//         meeting_point_date: "",
//         meeting_point_time: ""
//         //calculable
//         // meeting_point_start: "",
//         // meeting_point_end: "",
//     },
//     billing: {
//         cc_number: "",
//         exp_date: "",
//         cvv: "",
//         cc_zip: "",
//         // check_later: false,
//     },
// }