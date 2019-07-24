import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {apiContexts} from "../../api/ContextApi";
import {Spinner} from "../../icons";
import Paper from "@material-ui/core/Paper/Paper";
import Grow from "@material-ui/core/Grow/Grow";
import {AddManagerDialog} from "./AddManagerDialog";
import {ManagerListItem} from "./ManagerListItem";
import {LocationListItem} from "./LocationListItem";
import {ManagerList} from "./ManagerList";
import {AuthController} from "../../Auth/AuthController";

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


export const ManagerAccessPage = () => {
    const [manager_selectedId, manager_selectId] = React.useState(null);
    const [location_updatedId, location_setUpdationId] = React.useState(null);
    const classes = useStyles();

    const locations_ctx = React.useContext(apiContexts.locations);
    const locations_controller_get_all = locations_ctx.locations_GetAll;

    const managerAccess_ctx = React.useContext(apiContexts.managerAccess);
    const managerAccess_controller = managerAccess_ctx.managerAccess_GetAll;

    const handleSubmitInvite = data => {
        return managerAccess_ctx.managerAccess_InsertAndGrantAccessAndSendInvite.request(data)
            .then(r=>{
                handleSelectManagerId(r.id)
                return r;
            })
            .then(r => managerAccess_controller.request())

    };

    React.useEffect(() => {
        locations_controller_get_all.request();
        managerAccess_controller.request();
    }, []);

    const managerItems = (managerAccess_controller.state || []).filter(m => +m.manager_id !== +AuthController.getManagerId());

    const selectedManager = (manager_selectedId && managerItems)
        ? (managerItems.find(m => +m.id === +manager_selectedId))
        : null;
    const selectedManagerLocationIds = selectedManager ? selectedManager.location_ids : [];
    const selectedManagerAccessType = selectedManager ? selectedManager.access_type : null;

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
    const handleSubmitDelete = (id) => {
        return managerAccess_ctx.managerAccess_DeleteById.request(id)
            .then(() => managerAccess_controller.request())
            .then(r=>{
                location_setUpdationId(null);
                manager_selectId(null);
            })

    };
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <Typography variant="h6" className={classes.title}>
                        Manager List
                    </Typography>
                    <Paper>
                        {managerItems ? (
                            <ManagerList
                                items={managerItems}
                                selectedId={manager_selectedId}
                                onSelect={handleSelectManagerId}
                                onSubmitInvite={handleSubmitInvite}
                                onSubmitDelete={handleSubmitDelete}
                            />
                        ) : <Spinner/>}


                    </Paper>
                </Grid>
                <Grid item xs={12} md={7}
                      style={{display: !manager_selectedId || selectedManagerAccessType === 'admin' ? 'none' : null}}>

                    <Typography variant="h6" className={classes.title}>
                        Location List
                    </Typography>
                    <Grow in={!!manager_selectedId} key={manager_selectedId}>
                        <Paper>
                            {locations_controller_get_all.state ? (
                                <List style={{minHeight: 250}}>
                                    {
                                        locations_controller_get_all.state
                                            .map(location => <LocationListItem
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