import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button/Button";
import Container from "@material-ui/core/Container/Container";
import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Link from "@material-ui/core/Link/Link";
import {Link as RouterLink} from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


export const passwordHint = 'Invalid password. Password should contain more then 8 characters [a-Z,!,@,#,$,%] and should contain numbers.';
export const emailHint = 'Invalid email address';

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validatePassword(password) {
    return /^(?=.*[A-Za-z])[A-Za-z\d$@!%*#?&.-]{8,}$/.test(password);
}

export const haveError = errors => Object.keys(errors).reduce((prev, k) => {
    return !!prev || !!errors[k]
}, false);


const useAuthStyles = makeStyles(theme => ({
    // '@global': {
    //     body: {
    //         backgroundColor: theme.palette.common.white,
    //     },
    // },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const makeQueryWithEmail = email => validateEmail(email) ? '?email=' + email : '';

export const AuthPage = ({
                             actionTitle = 'auth',
                             isPending,
                             fields = {},
                             onSubmit,
                             errors,
                             values,
                             disableEmail,
                             onInputChange
                         }) => {
    const classes = useAuthStyles();
    return <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                {actionTitle}
            </Typography>
            <form className={classes.form} onSubmit={onSubmit}>
                {
                    fields.email ? <TextField
                        disabled={disableEmail}
                        value={values.email || ''}
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
                    /> : null
                }
                {
                    fields.password ? <TextField
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
                    /> : null
                }
                {
                    fields.confirm_password ? <TextField
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
                    /> : null
                }
                {
                    fields.remember ? <FormControlLabel
                        control={<Checkbox checked={!!values.remember} color="primary"
                                           onChange={onInputChange('remember')}/>}
                        label="Remember me"
                    /> : null
                }
                <Button
                    disabled={!!haveError(errors) || !!isPending}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {actionTitle}
                </Button>
                <Grid container>
                    {
                        fields.goToForgotPassword ?
                            <Grid item xs>
                                <Link component={RouterLink}
                                      to={`/send-password-reset${makeQueryWithEmail(values.email)}`}
                                      href='#'
                                      variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            : null
                    }
                    {
                        fields.goToLogin ?
                            <Grid item xs>
                                <Link component={RouterLink}
                                      to={`/login${makeQueryWithEmail(values.email)}`}
                                      href='#'
                                      variant="body2">
                                    Back to Login
                                </Link>
                            </Grid>
                            : null
                    }
                </Grid>


            </form>
        </div>

    </Container>
};