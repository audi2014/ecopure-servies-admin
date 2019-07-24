import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {apiContexts} from "../../api/ContextApi";
import {AuthController} from "../../Auth/AuthController";
import {emailHint, passwordHint, useAuthStyles, validateEmail, validatePassword} from "./Login";


const haveError = errors => Object.keys(errors).reduce((prev, k) => {
    return !!prev || !!errors[k]
}, false);

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

export function SignUp({history, location}) {
    const {register} = React.useContext(apiContexts.auth);
    const classes = useAuthStyles();
    const queryEmail = location ? new URLSearchParams(location.search).get('email') : '';
    const [values, setValues] = useState({
        email: queryEmail || '',
        password: '',
        confirm_password: '',
        remember: true,
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
            return register.request({
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

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        disabled={!!queryEmail && validateEmail(values.email)}
                        value={values.email}
                        onChange={onInputChange('email')}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email : null}

                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        value={values.password}
                        onChange={onInputChange('password')}
                        helperText={errors.password ? errors.password : null}
                        error={!!errors.password}

                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        value={values.confirm_password}
                        onChange={onInputChange('confirm_password')}
                        helperText={errors.confirm_password ? errors.confirm_password : null}
                        error={!!errors.confirm_password}

                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirm_password"
                        label="confirmation"
                        type="password"
                        id="confirmation"
                        autoComplete="confirm-password"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={!!values.remember} color="primary"
                                           onChange={onInputChange('remember')}/>}
                        label="Remember me"
                    />
                    <Button
                        disabled={!!haveError(errors) || !!register.pending}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    {/*<Grid container>*/}
                    {/*<Grid item xs>*/}
                    {/*<Link href="#" variant="body2">*/}
                    {/*Forgot password?*/}
                    {/*</Link>*/}
                    {/*</Grid>*/}
                    {/*<Grid item>*/}
                    {/*<Link href="#" variant="body2">*/}
                    {/*{"Don't have an account? Sign Up"}*/}
                    {/*</Link>*/}
                    {/*</Grid>*/}
                    {/*</Grid>*/}
                </form>
            </div>

        </Container>
    );
}
