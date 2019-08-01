import {Footage_Title, Plan_Title} from "../../constants/Enum";

export const generateRange = ({start = 1, count}) => (new Array(count))
    .fill(null)
    .reduce((prev, curr, i) => {
        prev[i + start] = String(i + start);
        return prev;
    }, {});

export const objectValuesToKeys = (obj) => Object.keys(obj)
    .reduce((prev, key) => {
        prev[obj[key]] = obj[key];
        return prev;
    }, {});

export const FootageTitle_Title = objectValuesToKeys(Footage_Title);
export const PlanTitle_Title = objectValuesToKeys(Plan_Title);

export const NumBr_Title = {'Studio': 'Studio', ...generateRange({count: 5})};
export const NumBth_Title = generateRange({count: 3});
export const HomeCondition_Title = {
    'Exceptionally Clean': 'Exceptionally Clean',
    'Moderately Clean': 'Moderately Clean',
    'Very Cluttered': 'Very Cluttered',
};

export const NumKids_Title = generateRange({start: 0, count: 5});

function jsDate2Sql(date) {
    return date.getFullYear()
        + '-'
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + '-'
        + ("0" + date.getDate()).slice(-2);
}

function jsTime2Sql(date) {
    return date.getHours()
        + '-'
        + ("0" + date.getMinutes()).slice(-2)
        + '-'
        + ("0" + date.getSeconds()).slice(-2);
}

export function htmlDateString2Sql(v) {
    const time = Date.parse(v);
    return time ? jsDate2Sql(new Date(time)) : '';
}

export function htmlDateTimeString2Sql(v) {
    const time = Date.parse(v);
    return time ? jsDate2Sql(new Date(time)) + ' ' + jsTime2Sql(new Date(time)) : '';
}


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
        token,
//ignore
        cc_number,
        exp_date,
        cc_zip,
        cvv,
// b-a-d k-e-y
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
        token,
//hardocde fore legacy
        num_adults: "1",
        num_pets: "0",
        daily_tuning: "0",
    }
}