import {useState} from "react";
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


export const DeleteManagerDialog = ({className, onSubmit, email, confirmationWord, deleteId, onCancel}) => {
    if (!confirmationWord) confirmationWord = 'DELETE';
    const [pending, setPending] = useState(false);
    const [word, setWord] = useState('');
    const [error, setError] = useState(null);
    const handleClose = () => {
        onCancel();
        setPending(false);
        setWord('');
        setError('');
    };
    const handleSubmit = () => {
        if (confirmationWord.toLowerCase() === word.toLowerCase()) {
            setPending(true);
            onSubmit(deleteId).then(r => {
                handleClose();
            }).catch(e => {
                setPending(false);
            })
        } else {
            setError('type ' + confirmationWord + ' to confirm delete');
        }
    };
    const handleWordChange = e => {
        e.preventDefault();
        setError(null);
        setWord(e.currentTarget.value.trim());
    };
    return <React.Fragment>

        <Dialog
            open={!!deleteId}
            onClose={handleClose}
            aria-labelledby="Confirm Delete"
            aria-describedby={`Confirm Delete manager ${email}`}
        >
            <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Type `{confirmationWord}` to delete manager {email}
                </DialogContentText>


                <TextField
                    disabled={pending}
                    helperText={error}
                    error={!!error}
                    value={word}
                    onChange={handleWordChange}
                    autoFocus
                    margin="dense"
                    id="email"
                    label="confirm"
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