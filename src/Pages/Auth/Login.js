import React, {useState} from 'react'
import {apiContexts} from "../../api/ContextApi";
import {AuthController} from "../../Auth/AuthController";
import {AuthPage, emailHint, haveError, passwordHint, validateEmail, validatePassword} from "./AuthPage";


const validateForm = ({password, email}) => {
    const nextErrors = {};
    if (!validateEmail(email)) {
        nextErrors.email = emailHint;
    }
    if (!password.trim()) {
        nextErrors.password = passwordHint;
    }
    return nextErrors;
};

export function Login({history, location}) {
    const queryEmail = location ? new URLSearchParams(location.search).get('email') : '';
    const {login} = React.useContext(apiContexts.auth);
    const [values, setValues] = useState({
        email: queryEmail,
        password: '',
        remember: true,
    });
    const [errors, setErrors] = useState({
        email: undefined,
        password: undefined,
    });
    const onSubmit = (e) => {
        e.preventDefault();
        const nextErrors = {...errors, ...validateForm(values)};
        if (!haveError(nextErrors)) {
            return login.request({
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
        setErrors({...errors, [key]: ''});
    };
    return <AuthPage
        actionTitle={'Sign In'}
        isPending={!!login.pending}
        fields={{
            email: true,
            password: true,
            remember: true,
            goToForgotPassword: true,
        }}
        onSubmit={onSubmit}
        values={values}
        errors={errors}
        disableEmail={false}
        onInputChange={onInputChange}
    />
}
