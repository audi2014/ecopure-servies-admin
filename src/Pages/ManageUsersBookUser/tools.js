import {sqlStringToHtmlDate} from "../BaseManageUsers/tools";

export function makeRequestData(props) {
    const {
        //mutations
        start_clean_date,
        time_initial_cleaning,
        time_ongoing_cleaning,
        meeting_point_date,
        meeting_point_time,
        //raw
        pet_type,
        num_br,
        num_bth,
        footage,
        home_condition,
        num_kids,
        is830,
        frequency,
        home_access,
        special,
        ...rest

    } = props;
    const [mpTime_start, mpTime_end] = meeting_point_time.split('-');
    const mpDate = sqlStringToHtmlDate(meeting_point_date);
    return {
        start_clean_date: sqlStringToHtmlDate(start_clean_date),
        time_initial_cleaning,
        time_ongoing_cleaning,
        meeting_point_start: `${mpDate} ${mpTime_start || ''}`.trim(),
        meeting_point_end: `${mpDate} ${mpTime_end || ''}`.trim(),
        'add-on-services': (rest['add-on-services'] || []).join(','),
        'promo-code': rest['promo-code'],
        pet_type,
        num_br,
        num_bth,
        footage,
        home_condition,
        num_kids,
        is830,
        frequency,
        home_access,
        special,
    }
}