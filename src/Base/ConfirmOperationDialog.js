import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ConfirmOperationDialog = ({
                                           focusOnCancel,
                                           rightCancel,
                                           children,
                                           renderTitle,
                                           description,
                                           renderOkTitle = 'Confirm',
                                           renderCancelTitle = 'Cancel',
                                           onOk,
                                           ...props
                                       }) => {
    const [open, setOpen] = React.useState(false);
    const [okData, setOkData] = React.useState({});

    function handleClickOpen(data) {
        setOkData(data);
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleOk() {
        if (onOk) onOk(okData);
        handleClose();
    }

    let buttons = [
        <Button key={'cancel'} onClick={handleClose} color="default" autoFocus={focusOnCancel}>
            {renderCancelTitle(okData)}
        </Button>,
        <Button key={'ok'} onClick={handleOk} color="secondary" autoFocus={!focusOnCancel}>
            {renderOkTitle(okData)}
        </Button>
    ];
    if(rightCancel) buttons = buttons.reverse();

    return (
        <div>
            {
                children ? children(handleClickOpen) : null
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{renderTitle ? renderTitle(okData) : null}</DialogTitle>
                <DialogContent>
                    {
                        description
                            ? <DialogContentText id="alert-dialog-description">
                                {description}
                            </DialogContentText>
                            : null
                    }
                </DialogContent>
                <DialogActions>
                    {
                        buttons
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}