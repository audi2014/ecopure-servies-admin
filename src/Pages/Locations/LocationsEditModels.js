import React from "react";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {Link} from "react-router-dom";
import {AddIcon, AddOnIcon, CustomModelIcon, DeleteIcon, EditIcon, RegularIcon, Spinner} from "../../icons";
import Grid from "@material-ui/core/Grid/Grid";
import Fab from "@material-ui/core/Fab/Fab";
import Typography from "@material-ui/core/Typography/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {getManagerPreferences, ModelNameOrDefault} from "../../Base/tools";
import {ConfirmOperationDialog} from "../../Base/ConfirmOperationDialog";
import {apiContexts} from "../../api/ContextApi";

export const LocationsEditModels = ({location_id}) => {
    const {manager_Get} = React.useContext(apiContexts.manager);
    const {inNetworkModel_GetByLocationId, inNetworkModel_DeleteById} = React.useContext(apiContexts.inNetworkModel);
    const items = inNetworkModel_GetByLocationId.state;
    const preferences = getManagerPreferences(manager_Get.state);

    React.useEffect(() => {
        if (!manager_Get.state) {
            manager_Get.request();
        }
        inNetworkModel_GetByLocationId.request(location_id);
    }, [location_id]);

    const classes = useStyles();


    return <React.Fragment>
        <span style={{
            margin: 10,
            display: 'flex',
            alignItems: 'baseline',
        }}>
            <Typography variant="h6">Pricing Models</Typography>
            <Fab
                component={Link}
                to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.inNetworkPricing}/add`}
                style={{margin: 10}}
                size="small"
                color="primary"
                aria-label="Create">
                <AddIcon/>
            </Fab>
        </span>
        <ConfirmOperationDialog
            focusOnCancel={true}
            rightCancel={true}
            renderOkTitle={item => 'Delete'}
            renderCancelTitle={item => 'Cancel'}
            onOk={
                item => inNetworkModel_DeleteById.request(item.id)
                    .then(r => inNetworkModel_GetByLocationId.request(location_id))
            }
            renderTitle={item => `Are you sure you want to delete "${ModelNameOrDefault(item.name, item.id)}"?`}
        >
            {
                showDeleteDialog => manager_Get.pending ? <Spinner/> : <ModelsTable
                    location_id={location_id}
                    items={items}
                    classes={classes}
                    preferences={preferences}
                    showDeleteDialog={showDeleteDialog}/>
            }
        </ConfirmOperationDialog>
    </React.Fragment>
};


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
}));

const Row = ({title, Icon, renderActions}) => <TableRow>
    <TableCell>
        <Grid container direction="row" alignItems="center">
            <Grid item>{title} &nbsp;</Grid>
            {Icon ? <Grid item><Icon/></Grid> : null}
        </Grid>
    </TableCell>
    <TableCell>
        {renderActions ? renderActions() : null}
    </TableCell>
</TableRow>;

const ModelsTable = ({classes, preferences, items, showDeleteDialog, location_id}) => <Table>
    <TableHead>
        <TableRow>
            <TableCell>Name Of Model</TableCell>
            <TableCell>Actions</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        <Row
            renderActions={
                () =>
                    <IconButton
                        color="primary"
                        className={classes.button}
                        aria-label="Edit"
                        component={Link}
                        to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.outOfNetworkPricing}`}
                    >
                        <EditIcon/>
                    </IconButton>

            }
            title={ModelNameOrDefault(preferences.regularPricingModelName)}
            Icon={RegularIcon}
        />
        <Row
            renderActions={
                () => <IconButton
                    color="primary"
                    className={classes.button}
                    component={Link}
                    to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.addonPricing}`}
                    aria-label="Edit"
                >
                    <EditIcon/>
                </IconButton>
            }
            title={ModelNameOrDefault(preferences.addOnsPricingModelName)}
            Icon={AddOnIcon}
        />
        {items === false ?
            <TableRow><TableCell>Error. Loading Pricing Models was
                Failed</TableCell></TableRow> : null}
        {items === null ?
            <TableRow><TableCell><Spinner/></TableCell><TableCell/></TableRow> : null}

        {
            (items || []).map(item => <Row
                key={item.id}
                renderActions={
                    () => <React.Fragment>

                        <IconButton
                            color="primary"
                            className={classes.button}
                            component={Link}
                            to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.inNetworkPricing}/${item.id}/edit`}
                            aria-label="Edit"
                        >
                            <EditIcon/>
                        </IconButton>

                        <IconButton
                            onClick={() => showDeleteDialog(item)}
                            className={classes.button}
                            aria-label="Delete"
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </React.Fragment>
                }
                title={ModelNameOrDefault(item.name, item.id)}
                Icon={CustomModelIcon}
            />)
        }
    </TableBody>
</Table>;

