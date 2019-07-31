export const TABLE_COLUMNS_USER = [
    {title: 'Id', field: 'id'},
    {title: 'Email', field: 'email'},
    {title: 'First name', field: 'first_name'},
    {title: 'Last name', field: 'last_name'},
    {title: 'Building name', field: 'building_name'},
    {title: 'Address', field: 'address'},
    {title: 'Apt Num', field: 'apt_num'},
    {title: 'Zip Code', field: 'zip_code'},
    {title: 'Registration Date', field: 'registration_date',},
    {title: 'Meeting Point Start', field: 'meeting_point_start',},
    {title: 'Meeting Point End', field: 'meeting_point_end',},
    {title: 'Date Last Email', field: 'date_last_email',},
    {title: 'Start Clean Date', field: 'start_clean_date',},
    {title: 'Validation Status', field: 'validation_status'},
    {title: 'Email Counter', field: 'email_counter'},
    {title: 'Last Adm Message Id', field: 'last_adm_message_id'},
    {title: 'Is830', field: 'is830'},
    {title: 'Status', field: 'status'},
    {title: 'Num Adults', field: 'num_adults'},
    {title: 'Num Kids', field: 'num_kids'},
    {title: 'Num Pets', field: 'num_pets'},
    {title: 'Num Bth', field: 'num_bth'},
    {title: 'Active Message To Adm', field: 'active_message_to_adm'},
    {title: 'Email Notification', field: 'email_notification'},
    {title: 'Daily Tuning', field: 'daily_tuning'},
    {title: 'Building Flag', field: 'building_flag'},
    {title: 'Zip Flag', field: 'zip_flag'},
    {title: 'Pa Flag', field: 'pa_flag'},
    {title: 'Home Clng Prof Flag', field: 'home_clng_prof_flag'},
    {title: 'Num Br', field: 'num_br'},
    {title: 'Phone', field: 'phone'},
    {title: 'Frequency', field: 'frequency'},
    {title: 'Pet Type', field: 'pet_type'},
    {title: 'Home Condition', field: 'home_condition'},
    {title: 'Home Access', field: 'home_access'},
    {title: 'Special', field: 'special'},
    {title: 'Promo Code', field: 'promo_code'},
    {title: 'Resource', field: 'resource'},
    {title: 'Flight Stairs', field: 'flight_stairs'},
    {title: 'Token', field: 'token'},
];

export const USERS_FIELDS = TABLE_COLUMNS_USER.map(c => c.field);
export const USERS_FIELD_TITLE = TABLE_COLUMNS_USER.reduce((prev,curr)=>{
    prev[curr.field] = curr.title ||  curr.field;
    return prev;
},{});


