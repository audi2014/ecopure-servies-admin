import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import React from "react";
import Button from "@material-ui/core/Button/Button";
import {getDisplayName} from "../../Base/tools";

export const ModalError = ({closeError, error}) => <Dialog
    open={!!error}
    onClose={closeError}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>
    <DialogTitle id="alert-dialog-title">{error && error.title ? error.title : "Oops!"}</DialogTitle>
    {
        error
            ? <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {error.message}
                </DialogContentText>
            </DialogContent>
            : null
    }
    <DialogActions>
        <Button onClick={closeError} color="default" autoFocus={true}>
            OK
        </Button>
    </DialogActions>
</Dialog>;


export const ErrorContext = React.createContext({});
export const WithModalError = Component => {
    const ComponentWithError = props => {
        const [errorState, _errorSetState] = React.useState([]);
        const pushError = (message,key) => {
            console.error('handleErrorContext', {
                key, message
            });
            return _errorSetState([{key, message: String(message)}, ...errorState,]);
        };
        const closeCurrentError = () => {
            if (errorState.length > 0) {
                const [deleted, ...next] = errorState;
                _errorSetState(next);
            }
        };
        const getCurrentError = () => errorState.length > 0 ? errorState[0] : null;
        return <ErrorContext.Provider value={{
            pushError,
            closeCurrentError,
            getCurrentError,
        }}>
            <Component {...props}/>
            <ModalError error={getCurrentError()} closeError={closeCurrentError}/>
        </ErrorContext.Provider>
    };
    ComponentWithError.displayName = `WithModalError(${getDisplayName(Component)})`;
    return ComponentWithError;
};