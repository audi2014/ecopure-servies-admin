import {MUInputSelect, MUInputText, MUInputCheckboxes} from "../ManageUsersAddUser/components";
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
        Component: MUInputSelect,
        field: 'num_br',
        required: true,
        keyValue: NumBr_Title
    },
    {
        Component: MUInputSelect,
        field: 'num_bth',
        required: true,
        keyValue: NumBth_Title
    },
    {
        Component: MUInputSelect,
        field: 'footage',
        required: true,
        keyValue: FootageTitle_Title
    },
    {
        Component: MUInputSelect,
        field: 'home_condition',
        required: true,
        keyValue: HomeCondition_Title
    },
    {
        Component: MUInputSelect,
        field: 'num_kids',
        required: true,
        keyValue: NumKids_Title
    },
    {
        Component: MUInputText,
        field: 'pet_type',
        required: false,
    },
];
export const columnsService = [
    {
        Component: MUInputText,
        InputLabelProps: {shrink: true,},
        type: 'date',
        field: 'start_clean_date',
        required: true,
    },
    {
        Component: MUInputSelect,
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
        Component: MUInputSelect,
        field: 'frequency',
        required: true,
        keyValue: PlanTitle_Title
    },
    {
        Component: MUInputSelect,
        field: 'home_access',
        required: true,
        keyValue: {
            'Key with concierge': 'Key with concierge',
            'Other': 'Other',
            'I will be home': 'I will be home',
        }
    },
    {
        Component: MUInputSelect,
        field: 'time_initial_cleaning',
        required: true,
        keyValue: {
            'Early Morning': 'Early Morning',
            'Late Morning': 'Late Morning',
            // '0': '-',
        }
    },
    {
        Component: MUInputSelect,
        field: 'time_ongoing_cleaning',
        required: true,
        keyValue: {
            'Early Morning': 'Early Morning',
            'Late Morning': 'Late Morning',
            'Afternoon': 'Afternoon',
        }
    },
];
export const columnsSpecial = [
    {
        Component: MUInputCheckboxes,
        field: 'add-on-services',
    },
    {
        Component: MUInputText,
        field: 'special',
        required: false,
    },
    {
        Component: MUInputText,
        field: 'promo-code',
        required: false,
    },

];
export const columnsCall = [
    {
        Component: MUInputText,
        type: 'date',
        field: 'meeting_point_date',
        InputLabelProps: {shrink: true,},
        required: true,
    },
    {
        Component: MUInputSelect,
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
        Component: MUInputText,
        name: "credit-number", type: "tel", pattern: /\D/g, maxLength: "19",
        field: 'cc_number',
        required: true,
    },
    {
        Component: MUInputText,
        name: "credit-expires", type: "tel", maxLength: "7", placeholder: "MM / YY",

        field: 'exp_date',
        required: true,
    },
    {
        Component: MUInputText,
        name: "credit-cvc", type: "tel", pattern: /\D/g, maxLength: "4",
        field: 'cvv',
        required: true,
    },
    {
        Component: MUInputText,
        field: 'cc_zip',
        required: true,
    },
];

export const StepTitle_columns_INITIAL = {
    'Home': columnsHome,
    'Service': columnsService,
    'Special': columnsSpecial,
    'Welcome Call': columnsCall,
    'Billing': columnsCard,
    'Confirm': [],
    'Success': [],
};

export const StepTitle_columns_SHORT = {
    // 'Home': columnsHome,
    'Service': columnsService,
    'Special': columnsSpecial,
    // 'Welcome Call': columnsCall,
    'Billing': columnsCard,
    'Confirm': [],
    'Success': [],
};

export const STEP_TITLES_INITIAL = Object.keys(StepTitle_columns_INITIAL);
export const STEP_TITLES_SHORT = Object.keys(StepTitle_columns_SHORT);

