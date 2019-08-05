import {emailHint, haveError, passwordHint, validateEmail, validatePassword} from "../Auth/AuthPage";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {MSG_EMAIL_ALREADY_EXIST, MSG_ZIPCODE_NOT_SUPPORTED} from "../BaseManageUsers/constants";
import {generatePassword} from "../BaseManageUsers/tools";

const emptyLocationChangeState = {
    'zip_code': '',
    'building_id': '',
    'building_name': '',
    'address': '',
    'apt_num': '',
};
export const makeHandleLocationChange = ({state, errors, setState, setErrors}) => (key, value) => {

    setErrors({...errors, ...emptyLocationChangeState, [key]: ''});
    setState({...state, ...emptyLocationChangeState, [key]: value});
};

export const makeHandleEmailChange = ({state, errors, setState, setErrors}) => (key, value) => {
    value = (value || '').toLowerCase().trim();
    setErrors({...errors, [key]: ''});
    setState({...state, [key]: value});
};
export const makeHandleZipCodeChange = ({state, errors, setState, setErrors}) => (key, value) => {
    value = (value || '').replace(/[^0-9]/g, '');
    setErrors({...errors, [key]: ''});
    setState({...state, [key]: value});
};

const emptyBuildingChangeState = {
    'building_name': '',
    'address': '',
    'apt_num': '',
};
export const makeHandleBuildingIdChange = ({state, errors, setState, setErrors, items}) => (key, value) => {
    const building = items.find(b => +b.id === +value);

    if (!building) {
        setState({...state, ...emptyBuildingChangeState, [key]: value});
        setErrors({...errors, ...emptyBuildingChangeState, [key]: ''});
    } else {
        setState({
            ...state,
            building_name: building.name,
            address: building.address,
            apt_num: '',
            [key]: value
        });
        setErrors({
            ...errors, ...emptyBuildingChangeState,
            [key]: ''
        });
    }
};

export const makeHandleDefaultChange = ({state, errors, setState, setErrors}) => (key, value) => {
    setErrors({...errors, [key]: ''});
    setState({...state, [key]: (value || '')});
};


export const makeHandleEmailBlur = ({state, errors, setState, setErrors, users_checkEmailExist}) => () => {
    const email = state.email;
    if (!email) return;
    if (!validateEmail(email)) {
        setErrors({...errors, email: emailHint})
    } else if (!users_checkEmailExist.pending) {
        users_checkEmailExist.request({email}).then(r => {
            if (r === 'exist') {
                setErrors({...errors, email: MSG_EMAIL_ALREADY_EXIST})
            }
        });
    }
};

export const makeHandleZipCodeBlur = ({state, errors, setState, setErrors, pending, items = []}) => () => {
    const zip_code = state.zip_code;
    if (zip_code && !pending && !items.includes(zip_code)) {
        setErrors({...errors, zip_code: MSG_ZIPCODE_NOT_SUPPORTED})
    }
};


const validateForm = ({password, email}) => {
    const nextErrors = {};
    if (!validateEmail(email)) {
        nextErrors.email = emailHint;
    }
    if (!validatePassword(password)) {
        nextErrors.password = passwordHint;
    }
    return nextErrors;
};
export const makeHandleSubmitRegister = ({state, errors, users_Register, users_checkEmailExist, setErrors, setState, history}) => (e) => {
    e.preventDefault();
    const values = {
        ...state,
        pass: generatePassword(),
        device: 'dashboard',
    };

    const nextErrors = {...errors, ...validateForm({email: values.email, password: values.password,})};
    if (!haveError(nextErrors)) {
        console.log(values);

        return users_checkEmailExist.request({email: values.email})
            .then(r => {
                if (r === 'exist') {
                    setErrors({...errors, email: MSG_EMAIL_ALREADY_EXIST});
                    throw new Error(MSG_EMAIL_ALREADY_EXIST);
                }
            }).then(() => users_Register.request({
                ...values,
            }).then(r => {
                if (r) {
                    history.push(`/${RoutingConstants.manageUsers}/${r.id}/book`);
                    console.log(r);
                }
            })).catch(e => {

            })


    } else {
        setErrors(nextErrors)
    }

};