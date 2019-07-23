import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {apiContexts} from "../../api/ContextApi";
import {AddIcon, LocationIcon, Spinner} from "../../icons";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import RegisteredManager from '@material-ui/icons/HowToReg';
import InvitedManager from '@material-ui/icons/ContactMail';
import Fab from "@material-ui/core/Fab/Fab";
import Paper from "@material-ui/core/Paper/Paper";
import Zoom from "@material-ui/core/Zoom/Zoom";
import Grow from "@material-ui/core/Grow/Grow";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import TextField from "@material-ui/core/TextField/TextField";
import {emailHint, validateEmail} from "../Auth/Login";

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));


const Location = ({name, address, id, onSelect, checked, pending}) =>
    <ListItem
        button
    >
        <ListItemIcon>
            <LocationIcon/>
        </ListItemIcon>
        <ListItemText
            primary={name}
            secondary={address}
        />
        <ListItemSecondaryAction>
            {pending
                ? <Spinner/>
                : <Checkbox
                    color="primary"
                    edge="end"
                    onChange={() => onSelect(id)}
                    checked={checked}
                />
            }
        </ListItemSecondaryAction>
    </ListItem>
;

const Manager = ({email_invite, access_type, profile_id, id, selectedId, onSelect}) =>
    <ListItem
        button
        onClick={() => onSelect(+id)}
        selected={+selectedId === +id}
    >
        <ListItemIcon>
            {profile_id ? <RegisteredManager/> : <InvitedManager/>}
        </ListItemIcon>
        <ListItemText
            primary={`${email_invite || access_type}`}
            secondary={access_type}
        />

    </ListItem>
;

const AddManager = ({className, onSubmit}) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        setOpen(true);
        setEmail('');
    };
    const handleSubmit = () => {
        if (validateEmail(email)) {
            onSubmit(email);
            setOpen(false);
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
                <TextField

                    helperText={error}
                    error={!!error}

                    value={email}
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
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" autoFocus>
                    Send
                </Button>
            </DialogActions>
        </Dialog></React.Fragment>
}

export const ManagerAccessPage = () => {
    const [manager_selectedId, manager_selectId] = React.useState(null);
    const [location_updatedId, location_setUpdationId] = React.useState(null);
    const classes = useStyles();

    const locations_ctx = React.useContext(apiContexts.locations);
    const locations_controller_get_all = locations_ctx.locations_GetAll;

    const managerAccess_ctx = React.useContext(apiContexts.managerAccess);
    const managerAccess_controller = managerAccess_ctx.managerAccess_GetAll;

    const handleSubmitInvite = email_invite => {
        managerAccess_ctx.managerAccess_InsertAndGrantAccessAndSendInvite.request({email_invite})
            .then(r=>managerAccess_controller.request())
    }

    React.useEffect(() => {
        locations_controller_get_all.request();
        managerAccess_controller.request();
    }, []);

    const selectedManager = (manager_selectedId && managerAccess_controller.state)
        ? (managerAccess_controller.state.find(m => +m.id === +manager_selectedId))
        : null;
    const selectedManagerLocationIds = selectedManager ? selectedManager.location_ids : [];

    const handleSelectManagerId = (id) => {
        if (id && !location_updatedId) {
            manager_selectId(id)
        }
    };
    const handleLocationOfManagerChange = (selectedLocationId) => {
        if (manager_selectedId && !location_updatedId) {
            location_setUpdationId(selectedLocationId);
            const location_ids = selectedManagerLocationIds.includes(+selectedLocationId)
                ? selectedManagerLocationIds.filter(id => +id !== +selectedLocationId)
                : [...selectedManagerLocationIds, selectedLocationId];
            managerAccess_ctx.managerAccess_UpdateById.request(manager_selectedId, {location_ids})
                .then(() => managerAccess_controller.request())
                .then(() => location_setUpdationId(null))
        }
    };
    return (
        <div>

            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <Typography variant="h6" className={classes.title}>
                        Manager List
                    </Typography>
                    <Paper>
                        {managerAccess_controller.state ? (
                            <List style={{minHeight: 250}}>
                                {
                                    managerAccess_controller.state
                                        .map(manager => <Manager
                                            key={+manager.id}
                                            {...manager}
                                            selectedId={manager_selectedId}
                                            onSelect={handleSelectManagerId}
                                        />)
                                }
                                <AddManager className={classes.fab} onSubmit={handleSubmitInvite}/>
                            </List>
                        ) : <Spinner/>}


                    </Paper>
                </Grid>
                <Grid item xs={12} md={7}>

                    <Typography variant="h6" className={classes.title}>
                        Location List
                    </Typography>
                    <Grow in={!!manager_selectedId} key={manager_selectedId}>
                        <Paper>
                            {locations_controller_get_all.state ? (
                                <List style={{minHeight: 250}}>
                                    {
                                        locations_controller_get_all.state
                                            .map(location => <Location
                                                key={+location.id}
                                                {...location}
                                                pending={+location_updatedId === +location.id}
                                                onSelect={handleLocationOfManagerChange}
                                                checked={selectedManagerLocationIds.includes(+location.id)}
                                            />)
                                    }
                                </List>
                            ) : <Spinner/>}
                        </Paper>
                    </Grow>


                </Grid>
            </Grid>


        </div>
    );
};