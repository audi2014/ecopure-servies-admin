import {useState} from "react";
import {emailHint, validateEmail} from "../Auth/Login";
import React from "react";
import Fab from "@material-ui/core/Fab/Fab";
import {AddIcon, Spinner} from "../../icons";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import {Select} from "../../Base/BaseInput";


export const AddManagerDialog = ({className, onSubmit}) => {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [email_invite, setEmail] = useState('');
    const [access_type, setAccessType] = useState('manager');
    const [error, setError] = useState(null);
    const handleClose = () => {
        setOpen(false);
        setPending(false);
    }
    const handleOpen = () => {
        setPending(false);
        setOpen(true);
        setEmail('');
    };
    const handleSubmit = () => {
        if (validateEmail(email_invite)) {
            setPending(true);
            onSubmit({email_invite, access_type}).then(r => {
                handleClose();
            }).catch(e => {
                setPending(false);
            })
        } else {
            setError(emailHint);
        }
    };
    const handleEmailChange = e => {
        e.preventDefault();
        setError(null);
        setEmail(e.currentTarget.value.trim().toLowerCase());
    };
    return <React.Fragment>
        <Fab aria-label={'add manager'} className={className} color='primary' onClick={handleOpen}>
            <AddIcon/>
        </Fab>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="Grant Access"
            aria-describedby="Sen invitation email for new Account"
        >
            <DialogTitle id="alert-dialog-title">{"Grant Access"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Sen invitation email for new Account
                </DialogContentText>

                <Select
                    disabled={pending}
                    label={'Role'}
                    style={{width: '100%'}}
                    value={access_type}
                    setValue={setAccessType}
                    keyValue={{
                        admin: 'Administrator',
                        manager: 'Manager',
                    }}/>
                <TextField
                    disabled={pending}
                    helperText={error}
                    error={!!error}

                    value={email_invite}
                    onChange={handleEmailChange}
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                />

            </DialogContent>

            <DialogActions>
                <Button
                    disabled={pending}
                    onClick={handleClose}
                    color="secondary"
                >
                    Cancel
                </Button>
                {pending ? <Spinner/> : <Button
                    onClick={handleSubmit}
                    color="primary"
                    autoFocus
                >
                    Send
                </Button>}

            </DialogActions>
        </Dialog></React.Fragment>
};