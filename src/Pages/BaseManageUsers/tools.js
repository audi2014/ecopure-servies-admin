export const generatePassword = () => {
    const required_chars = 8 + Math.random() * 8;
    const required_digits = 8 + Math.random() * 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charset_length = charset.length;
    const digits = "1234567890";
    const digits_length = digits.length;
    let retVal = "";
    for (let i = 0; i < required_chars; i++) {
        retVal += charset.charAt(Math.floor(Math.random() * charset_length));
    }
    for (let i = 0; i < required_digits; i++) {
        retVal += charset.charAt(Math.floor(Math.random() * digits_length));
    }
    return retVal;
};

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

export function sqlStringToHtmlDateTime(v) {
    const unix = Date.parse(v);
    const date = new Date(unix);
    return unix ? jsDate2Sql(date) + 'T' + jsTime2Sql(date) : '';
}

export function sqlStringToHtmlDate(v) {
    const date = dateStringToDateWithTimezoneFix(v);
    return date ? jsDate2Sql(date) : '';
}

function jsDate2Sql(date) {
    return date.getFullYear()
        + '-'
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + '-'
        + ("0" + date.getDate()).slice(-2);
}

function jsTime2Sql(date) {
    return ("0" + date.getHours()).slice(-2)
        + ':'
        + ("0" + date.getMinutes()).slice(-2)
        + ':'
        + ("0" + date.getSeconds()).slice(-2);
}

const dateStringToDateWithTimezoneFix = (str) => {
    const unixms = Date.parse(str);
    if (!unixms) return null;
    const date = new Date(unixms);
    const offsetms = date.getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() + offsetms);
};
