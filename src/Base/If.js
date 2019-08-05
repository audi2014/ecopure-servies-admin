export const If = ({children, value}) => {
    if (!children) {
        return null;
    } else if (Array.isArray(children)) {
        return (value ? children[0] : children[1]) || null;
    } else if (value) {
        return children;
    } else {
        return null;
    }
};

export const SwitchKey = ({children, keyValue, defaultValue, defaultKey}) => {
    if (!children || !Array.isArray(children) || !Array.isArray(keyValue)) {
        return null;
    }
    const key = Object.keys(keyValue).find(key => !!keyValue[key]) || defaultKey;
    return children.find(ch => ch.key === key) || defaultValue;
};