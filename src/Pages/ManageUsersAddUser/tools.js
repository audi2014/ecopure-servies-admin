

export function generatePassword() {
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




