import React, {useState} from 'react'
import {apiContexts} from "../../api/ContextApi";
import {AuthController} from "../../Auth/AuthController";
import {AuthPage, emailHint, haveError, passwordHint, validateEmail, validatePassword} from "./AuthPage";


const validateForm = ({password, confirm_password, email}) => {
    const nextErrors = {};
    if (!validateEmail(email)) {
        nextErrors.email = emailHint;
    }
    if (!validatePassword(password)) {
        nextErrors.password = passwordHint;
    }
    if (password !== confirm_password) {
        nextErrors.confirm_password = 'password confirmation does not match';
    }
    return nextErrors;
};

export function LoginWithNewPassword({history, location}) {
    const {loginWithNewPassword} = React.useContext(apiContexts.auth);
    const queryEmail = location ? new URLSearchParams(location.search).get('email') : '';
    const queryToken = location ? new URLSearchParams(location.search).get('token') : '';
    const [values, setValues] = useState({
        email: queryEmail,
        password: '',
        confirm_password: '',
        remember: true,
        token: queryToken,
    });
    const [errors, setErrors] = useState({
        email: undefined,
        password: undefined,
        confirm_password: undefined,
    });
    const onSubmit = (e) => {
        e.preventDefault();
        const nextErrors = {...errors, ...validateForm(values)};
        if (!haveError(nextErrors)) {
            return loginWithNewPassword.request({
                ...values,
            }).then(r => {
                if (r) {
                    history.push(AuthController.popLoginRedirectUrl())
                }
            })


        } else {
            setErrors(nextErrors)
        }


    };
    const onInputChange = key => e => {
        let v = e.currentTarget.value;
        if (key === 'email') v = v.trim().toLowerCase();
        if (key === 'remember') {
            v = e.currentTarget.checked;
        }

        setValues({...values, [key]: v});
        setErrors({...errors, [key]: '', confirm_password: ''});
    };

    return <AuthPage
        actionTitle={'Reset & Login'}
        isPending={!!loginWithNewPassword.pending}
        fields={{
            email: true,
            password: true,
            confirm_password: true,
            remember: true,
            goToLogin:true,
        }}
        onSubmit={onSubmit}
        values={values}
        errors={errors}
        disableEmail={true}
        onInputChange={onInputChange}
    />
}
