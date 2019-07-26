import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import React from "react";
import {AddOnValueType_Title, Stairs_Title} from "../../constants/Enum";
import {Select} from "../../Base/BaseInput";
import {apiContexts} from "../../api/ContextApi";
import Button from "@material-ui/core/Button/Button";
import {emailHint, haveError, passwordHint, validateEmail, validatePassword} from "../Auth/AuthPage";
import {AuthController} from "../../Auth/AuthController";

const emailAlreadyExist = 'This email already exist';


const RESOURCES = {
    'EcoPure Offic': 'EcoPure Offic',
    'Ecopure Van': 'Ecopure Van',
    'Facebook': 'Facebook',
    'Friend Recommended': 'Friend Recommended',
    'Google Search': 'Google Search',
    'In-Network': 'In-Network',
    'Instagram': 'Instagram',
    'no': 'no',
    'Other': 'Other',
    'Saw EcoPure Van': 'Saw EcoPure Van',
    'Yelp': 'Yelp',
};

function generatePassword() {
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

const ProfileText = ({title, field, value, onChange, ...rest}) => <TextField
    onChange={e => onChange(field, e.currentTarget.value)}
    id={field}
    label={title}
    value={value || ''}
    margin="normal"
    variant="outlined"
    {...rest}
/>;

const ProfileSelect = ({title, field, value, onChange, keyValue = {}, ...rest}) => <Select
    {...rest}
    label={title}
    setValue={value => onChange(field, value)}
    value={value || ''}
    keyValue={keyValue}
/>;


const columnsProfile = [
    {Component: ProfileText, title: 'Email', field: 'email', type: 'email', required: true,},
    {Component: ProfileText, title: 'First Name', field: 'first_name', required: true,},
    {Component: ProfileText, title: 'Last Name', field: 'last_name', required: true,},
    {Component: ProfileText, title: 'Phone', field: 'phone', required: true,},
    {Component: ProfileSelect, title: 'How did you find EcoPure?', field: 'resource', keyValue: RESOURCES},

];

const columnsAddress = [
    {Component: ProfileText, title: 'Building Name', field: 'building_name',},
    {Component: ProfileText, title: 'Street Address', field: 'address',},
    {Component: ProfileText, title: 'Apartment Number', field: 'apt_num',},
    {Component: ProfileText, title: 'Zip Code', field: 'zip_code',},
    {Component: ProfileSelect, title: 'How many stairs in climb?', field: 'flight_stairs', keyValue: Stairs_Title},

//list

//date-time
//     {Component: ProfileText, title: 'meeting_point_start', field: 'meeting_point_start',},
//     {Component: ProfileText, title: 'meeting_point_end', field: 'meeting_point_end',},

//safety?
//     {title: 'cc_number', field: 'cc_number',},
//     {title: 'exp_date', field: 'exp_date',},
//     {title: 'cvv', field: 'cvv',},
//     {title: 'cc_zip', field: 'cc_zip',},
];

const columnsBooking = [

//date-time

    //start_clean_date
    {
        Component: ProfileText,
        InputLabelProps: {shrink: true,},
        type: 'date',
        title: 'start clean date',
        field: 'start_clean_date',
    },
    // {
    //     Component: ProfileText,
    //     InputLabelProps: {shrink: true,},
    //     type: 'datetime-local',
    //     title: 'meeting_point_start',
    //     field: 'meeting_point_start',
    // },
    // {
    //     Component: ProfileText,
    //     InputLabelProps: {shrink: true,},
    //     type: 'datetime-local',
    //     title: 'meeting_point_end',
    //     field: 'meeting_point_end',
    // },

//safety?
//     {title: 'cc_number', field: 'cc_number',},
//     {title: 'exp_date', field: 'exp_date',},
//     {title: 'cvv', field: 'cvv',},
//     {title: 'cc_zip', field: 'cc_zip',},
];

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

export const ManageUsersAddUserPage = () => {
    const {users_Register, users_checkEemailExist} = React.useContext(apiContexts.users);
    const [state, setState] = React.useState({
        email:'audi2014@test1.gmail.com',
        first_name:'first_name',
        last_name:'last_name',
        phone:'phone',
        resource:'Other',
        building_name:'building_name',
        address:'address',
        apt_num:'apt_num',
        zip_code:'07302',
        flight_stairs:'11_30',
        start_clean_date:'2019-11-21',
    });
    const [errors, setErrors] = React.useState({});

    const handleChange = (key, value) => {
        if (key === 'email') value = value.toLowerCase().trim();
        setErrors({...errors, [key]: ''});
        setState({...state, [key]: value});
    };

    const onEmailBlur = () => {
        const email = state.email;
        if (!email) return;
        if (!validateEmail(email)) {
            setErrors({...errors, email: emailHint})
        } else if (!users_checkEemailExist.pending) {
            users_checkEemailExist.request({email}).then(r => {
                if (r === 'exist') {
                    setErrors({...errors, email: emailAlreadyExist})
                }
            });
        }
    };

    const onSubmitRegister = (e) => {
        const values = {
            ...state,
            pass: generatePassword(),
        };

        e.preventDefault();
        const nextErrors = {...errors, ...validateForm(values)};
        if (!haveError(nextErrors)) {
            console.log(values);
            return users_Register.request({
                ...values,
            }).then(r => {
                if (r) {
                    // history.push(AuthController.popLoginRedirectUrl())
                    console.log(r);
                }
            })


        } else {
            setErrors(nextErrors)
        }

    };


    return <form noValidate autoComplete="off" onSubmit={onSubmitRegister}>
        <Typography style={{margin: 20}} variant="h6">Profile</Typography>
        <FormControl fullWidth>{
            columnsProfile.map(({Component, ...props}, idx) => {

                return <Component
                    onBlur={props.field === 'email' ? onEmailBlur : null}
                    error={!!errors[props.field]}
                    helperText={errors[props.field] ? errors[props.field] : null}
                    onChange={handleChange}
                    key={props.field}
                    value={state[props.field]}
                    {...props}
                />
            })}
        </FormControl>


        <Typography style={{margin: 20}} variant="h6">Address</Typography>
        <FormControl fullWidth>{
            columnsAddress.map(({Component, ...props}, idx) => {
                return <Component
                    error={!!errors[props.field]}
                    helperText={errors[props.field] ? errors[props.field] : null}
                    onChange={handleChange}
                    key={props.field}
                    value={state[props.field]}
                    {...props}
                />
            })}
        </FormControl>
        <Typography style={{margin: 20}} variant="h6">Booking</Typography>
        <FormControl fullWidth>{
            columnsBooking.map(({Component, ...props}, idx) => {
                return <Component
                    error={!!errors[props.field]}
                    helperText={errors[props.field] ? errors[props.field] : null}
                    onChange={handleChange}
                    key={props.field}
                    value={state[props.field]}
                    {...props}
                />
            })}
        </FormControl>

        <Button
            disabled={!!haveError(errors) || !!users_Register.pending}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
        >
            Create User
        </Button>


    </form>;

    // return "ManageUsersAddUserPage"
};