import {ProfileSelect, ProfileText, SplitStringCheckbox} from "../ManageUsersAddUser/components";
import {Footage_Title, Plan_Title, Stairs_Title} from "../../constants/Enum";
import {HomeCondition_Title, NumBr_Title, NumBth_Title, NumKids_Title, NumPets_Title} from "./constants";


export const columnsHome = [
    {
        Component: ProfileSelect,
        title: 'Bedrooms',
        field: 'num_br',
        required: true,
        keyValue: NumBr_Title
    },
    {
        Component: ProfileSelect,
        title: 'Bathrooms',
        field: 'num_bth',
        required: true,
        keyValue: NumBth_Title
    },
    {
        Component: ProfileSelect,
        title: 'Square Footage',
        field: 'footage',
        required: true,
        keyValue: Footage_Title
    },
    {
        Component: ProfileSelect,
        title: 'Home Condition',
        field: 'home_condition',
        required: true,
        keyValue: HomeCondition_Title
    },
    {
        Component: ProfileSelect,
        title: 'Kids count',
        field: 'num_kids',
        required: true,
        keyValue: NumKids_Title
    },
    {
        Component: ProfileText,
        title: 'Pet type',
        field: 'pet_type',
        required: false,
    },
];

export const columnsService = [
    {
        Component: ProfileText,
        InputLabelProps: {shrink: true,},
        type: 'date',
        title: 'Start Cleaning Date',
        field: 'start_clean_date',
        required: true,
    },
    {
        Component: ProfileSelect,
        errorValue: '0',
        title: 'is ok at 8:30',
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
        title: 'Frequency',
        field: 'frequency',
        required: true,
        keyValue: Plan_Title
    },
    {
        Component: ProfileSelect,
        field: 'home_access',
        title: 'Home access',
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
        title: 'time_initial_cleaning',
        field: 'time_initial_cleaning',
        required: true,
    },
    {
        Component: ProfileText,
        type: 'datetime-local',
        InputLabelProps: {shrink: true,},
        title: 'time_ongoing_cleaning',
        field: 'time_ongoing_cleaning',
        required: true,
    },
];
export const columnsSpecial = [
    {
        Component: SplitStringCheckbox,
        title: 'Add-On Services',
        field: 'add-on-services',
    },
    {
        Component: ProfileText,
        title: 'Comments',
        field: 'special',
        required: false,
    },
    {
        Component: ProfileText,
        title: 'promo-code',
        field: 'promo-code',
        required: false,
    },

];
export const columnsCall = [
    {
        Component: ProfileText,
        type: 'date',
        title: 'meeting_point_date',
        field: 'meeting_point_date',
        required: true,
    },
    {
        Component: ProfileSelect,
        title: 'meeting_point_time',
        field: 'meeting_point_time',
        required: true,
        keyValue: {
            '8:00/9:00  ': '8:00 am - 9:00 am',
            '9:00/10:00 ': '9:00 am - 10:00 am',
            '10:00/11:00': '10:00 am - 11:00 am',
            '11:00/12:00': '11:00 am - 12:00 pm',
            '12:00/13:00': '12:00 pm - 1:00 pm',
            '13:00/14:00': '1:00 pm - 2:00 pm',
            '14:00/15:00': '2:00 pm - 3:00 pm',
            '15:00/16:00': '3:00 pm - 4:00 pm',
            '16:00/17:00': '4:00 pm - 5:00 pm',
        }
    }
];


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