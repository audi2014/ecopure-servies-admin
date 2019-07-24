import React, {useState} from 'react'
import {apiContexts} from "../../api/ContextApi";
import {AuthController} from "../../Auth/AuthController";
import {AuthPage, emailHint, haveError, passwordHint, validateEmail, validatePassword} from "./AuthPage";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import {Spinner} from "../../icons";
import Dialog from "@material-ui/core/Dialog/Dialog";


const validateForm = ({email}) => {
    const nextErrors = {};
    if (!validateEmail(email)) {
        nextErrors.email = emailHint;
    }

    return nextErrors;
};

export function SendResetPasswordEmail({location, history}) {
    const queryEmail = location ? new URLSearchParams(location.search).get('email') : '';
    const [wasSent, setWasSent] = useState(false);
    const {sendResetPassword} = React.useContext(apiContexts.auth);
    const [values, setValues] = useState({
        email: queryEmail,
    });
    const [errors, setErrors] = useState({
        email: undefined,
    });
    const onSubmit = (e) => {
        e.preventDefault();
        const nextErrors = {...errors, ...validateForm(values)};
        if (!haveError(nextErrors)) {
            return sendResetPassword.request({
                ...values,
            }).then(r => {
                if (r) {
                    setWasSent(true);
                }
            })


        } else {
            setErrors(nextErrors)
        }


    };
    const onInputChange = key => e => {
        let v = e.currentTarget.value;
        if (key === 'email') v = v.trim().toLowerCase();


        setValues({...values, [key]: v});
        setErrors({...errors, [key]: ''});
    };

    const handleClose = () => {
        history.replace(AuthController.popLoginRedirectUrl());
    };

    if (wasSent) {
        return <Dialog
            onClose={handleClose}
            open={true}
            aria-labelledby="Email was send"
            aria-describedby={`Email was send. Check your inbox with magic link`}
        >
            <DialogTitle id="alert-dialog-title">{"Email was send"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Email was send. Check your inbox with magic link
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="secondary"
                >
                    Go To Login
                </Button>


            </DialogActions>

        </Dialog>
    }


    return <AuthPage
        actionTitle={'Reset Password by Email'}
        isPending={!!sendResetPassword.pending}
        fields={{
            email: true,
            goToLogin: true,
        }}
        onSubmit={onSubmit}
        values={values}
        errors={errors}
        disableEmail={false}
        onInputChange={onInputChange}
    />
}
