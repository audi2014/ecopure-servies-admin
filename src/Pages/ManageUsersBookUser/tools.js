import {htmlDateString2Sql} from "../BaseManageUsers/tools";

export function makeRequestData(props) {
    const {
        //mutations
        start_clean_date,
        time_initial_cleaning,
        time_ongoing_cleaning,
        meeting_point_date,
        meeting_point_time,
        //raw
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
    const mpDate = htmlDateString2Sql(meeting_point_date);
    return {
        start_clean_date: htmlDateString2Sql(start_clean_date),
        time_initial_cleaning,
        time_ongoing_cleaning,
        meeting_point_start: `${mpDate} ${mpTime_start || ''}`.trim(),
        meeting_point_end: `${mpDate} ${mpTime_end || ''}`.trim(),
        'add-on-services': (rest['add-on-services'] || []).join(','),
        'promo-code': rest['promo-code'],
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