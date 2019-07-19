import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {apiContexts} from "../../api/ContextApi";
import {RoutingConstants} from "../../constants/RoutingConstants";


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
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

const passwordHint = 'Invalid password. Password should contain more then 8 characters [a-Z,!,@,#,$,%] and should contain numbers.';
const emailHint = 'Invalid email address';

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
    return /^(?=.*[A-Za-z])[A-Za-z\d$@!%*#?&.-]{8,}$/.test(password);
}

const haveError = errors => Object.keys(errors).reduce((prev, k) => {
    return !!prev || !!errors[k]
}, false);

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

export function Login({history}) {
    const {login} = React.useContext(apiContexts.auth);
    const classes = useStyles();
    const [values, setValues] = useState({
        email: 'email@gmail.comg',
        password: 'password',
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
                    history.push(`/`)
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

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
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
                    <FormControlLabel
                        control={<Checkbox checked={!!values.remember} color="primary"
                                           onChange={onInputChange('remember')}/>}
                        label="Remember me"
                    />
                    <Button
                        disabled={!!haveError(errors) || !!login.pending}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
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
