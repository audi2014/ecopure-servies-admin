import {
    BUILDING_FLAG_KEY_VALUE, DAILY_TUNING_KEY_VALUE,
    EMAIL_NOTIFICATION_KEY_VALUE,
    FIELDS_ADDRESS,
    FIELDS_CALL,
    FIELDS_CARD,
    FIELDS_HOME,
    FIELDS_PROFILE,
    FIELDS_SERVICE,
    FIELDS_SPECIAL,
    FOOTAGE_KEY_VALUE,
    HOME_ACCESS_KEY_VALUE,
    HOME_CLNG_PROF_FLAG_KEY_VALUE,
    HOME_CONDITION_KEY_VALUE,
    IS830_KEY_VALUE,
    MEETING_POINT_TIME_KEY_VALUE,
    NUM_ADULTS_KEY_VALUE,
    NUM_BR_KEY_VALUE,
    NUM_BTH_KEY_VALUE,
    NUM_KIDS_KEY_VALUE,
    NUM_PETS_KEY_VALUE,
    PLAN_KEY_VALUE,
    RESOURCES_KEY_VALUE,
    STAIRS_KEY_VALUE,
    STATUS_KEY_VALUE,
    TIME_INITIAL_CLEANING_KEY_VALUE,
    TIME_ONGOING_CLEANING_KEY_VALUE,
    ZIP_FLAG_KEY_VALUE
} from "./constants";
import {MUInputCheckboxes, MUInputSelect, MUInputText} from "./components";

const makeDateTime = field => ({
    Component: MUInputText,
    field: field,
    type: "datetime-local",
    InputLabelProps: {shrink: true,},
});
export const FIELDS_PROPS_ALL = [
    {Component: MUInputText, field: 'id', disabled: true,},
    {Component: MUInputText, field: 'token', disabled: true,},
    {Component: MUInputSelect, field: 'validation_status', keyValue: {'1': '1', '0': '0'}, disabled: true,},
    {Component: MUInputText, field: 'email_counter', disabled: true},
    {Component: MUInputText, field: 'last_adm_message_id', disabled: true,},
    {
        Component: MUInputSelect,
        field: 'num_adults',
        keyValue: NUM_ADULTS_KEY_VALUE,
    },
    {
        Component: MUInputSelect,
        field: 'num_pets',
        keyValue: NUM_PETS_KEY_VALUE,
    },
    {Component: MUInputText, field: 'active_message_to_adm', disabled: true,},
    {Component: MUInputSelect, field: 'email_notification', keyValue: EMAIL_NOTIFICATION_KEY_VALUE,},
    {Component: MUInputSelect, field: 'daily_tuning', keyValue: DAILY_TUNING_KEY_VALUE},
    {Component: MUInputSelect, field: 'building_flag', keyValue: BUILDING_FLAG_KEY_VALUE, disabled: true,},
    {Component: MUInputSelect, field: 'zip_flag', keyValue: ZIP_FLAG_KEY_VALUE, disabled: true,},
    {Component: MUInputSelect, field: 'pa_flag', keyValue: HOME_CLNG_PROF_FLAG_KEY_VALUE, disabled: true,},
    {Component: MUInputText, field: 'home_clng_prof_flag', keyValue: HOME_CLNG_PROF_FLAG_KEY_VALUE, disabled: true,},
    makeDateTime('registration_date'),
    makeDateTime('date_last_email'),
    makeDateTime('meeting_point_start'),
    makeDateTime('meeting_point_end'),
    {Component: MUInputSelect, field: 'status', keyValue: STATUS_KEY_VALUE,},
    {Component: MUInputText, field: 'promo_code',},


    {Component: MUInputText, field: 'email', type: 'email', required: true,},
    {Component: MUInputText, field: 'first_name', required: true,},
    {Component: MUInputText, field: 'last_name', required: true,},
    {Component: MUInputText, field: 'phone', required: true,},
    {Component: MUInputSelect, field: 'resource', keyValue: RESOURCES_KEY_VALUE},
    {Component: MUInputSelect, field: 'location_id',},
    {Component: MUInputSelect, field: 'zip_code',},
    {Component: MUInputSelect, field: 'building_id',},
    {Component: MUInputText, field: 'building_name',},
    {Component: MUInputText, field: 'address',},
    {Component: MUInputText, field: 'apt_num',},
    {Component: MUInputSelect, field: 'flight_stairs', keyValue: STAIRS_KEY_VALUE},
    {Component: MUInputSelect, field: 'num_br', required: true, keyValue: NUM_BR_KEY_VALUE},
    {Component: MUInputSelect, field: 'num_bth', required: true, keyValue: NUM_BTH_KEY_VALUE},
    {
        Component: MUInputSelect,
        field: 'footage',
        required: true,
        keyValue: FOOTAGE_KEY_VALUE
    },
    {
        Component: MUInputSelect,
        field: 'home_condition',
        required: true,
        keyValue: HOME_CONDITION_KEY_VALUE
    },
    {
        Component: MUInputSelect,
        field: 'num_kids',
        required: true,
        keyValue: NUM_KIDS_KEY_VALUE
    },
    {
        Component: MUInputText,
        field: 'pet_type',
        required: false,
    },

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
        keyValue: IS830_KEY_VALUE
    },
    {
        Component: MUInputSelect,
        field: 'frequency',
        required: true,
        keyValue: PLAN_KEY_VALUE
    },
    {
        Component: MUInputSelect,
        field: 'home_access',
        required: true,
        keyValue: HOME_ACCESS_KEY_VALUE
    },
    {
        Component: MUInputSelect,
        field: 'time_initial_cleaning',
        required: true,
        keyValue: TIME_INITIAL_CLEANING_KEY_VALUE
    },
    {
        Component: MUInputSelect,
        field: 'time_ongoing_cleaning',
        required: true,
        keyValue: TIME_ONGOING_CLEANING_KEY_VALUE
    },
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
        keyValue: MEETING_POINT_TIME_KEY_VALUE
    },
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

export const FIELDS_PROPS_PROFILE = FIELDS_PROPS_ALL.filter(({field}) => FIELDS_PROFILE.includes(field));
export const FIELDS_PROPS_ADDRESS = FIELDS_PROPS_ALL.filter(({field}) => FIELDS_ADDRESS.includes(field));
export const FIELDS_PROPS_HOME = FIELDS_PROPS_ALL.filter(({field}) => FIELDS_HOME.includes(field));
export const FIELDS_PROPS_SERVICE = FIELDS_PROPS_ALL.filter(({field}) => FIELDS_SERVICE.includes(field));
export const FIELDS_PROPS_SPECIAL = FIELDS_PROPS_ALL.filter(({field}) => FIELDS_SPECIAL.includes(field));
export const FIELDS_PROPS_CALL = FIELDS_PROPS_ALL.filter(({field}) => FIELDS_CALL.includes(field));
export const FIELDS_PROPS_CARD = FIELDS_PROPS_ALL.filter(({field}) => FIELDS_CARD.includes(field));