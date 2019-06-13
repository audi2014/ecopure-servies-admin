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
import {makeUsingLoadingById} from "../tools";
import {inNetworkModel_DeleteById, inNetworkModel_GetByLocationId} from "../../api/Api";
import Fab from "@material-ui/core/Fab/Fab";
import Typography from "@material-ui/core/Typography/Typography";

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

const use_load_inNetworkModel_GetByLocationId = makeUsingLoadingById(inNetworkModel_GetByLocationId);

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

export const PricingModelsTable = ({match}) => {
    const location_id = match.params.id;
    const classes = useStyles();
    const [items, _, reload] = use_load_inNetworkModel_GetByLocationId(location_id);
    const onDeleteClick = (item) => () => {
        if (window.confirm(`Confirm deleting model "${item.name}", id:"${item.id}"`)) {
            return inNetworkModel_DeleteById(item.id).then(r => reload())
        }
    };
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
        <Table>
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
                            <Fab
                                color="primary"
                                className={classes.button}
                                component={Link}
                                to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.outOfNetworkPricing}`}
                                variant="extended" aria-label="Edit"
                            >
                                Edit Model&nbsp;
                                <EditIcon/>
                            </Fab>

                    }
                    title={'Regular'}
                    Icon={RegularIcon}
                />
                <Row
                    renderActions={
                        () => <Fab
                            color="primary"
                            className={classes.button}
                            component={Link}
                            to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.addonPricing}`}
                            variant="extended" aria-label="Edit"
                        >
                            Edit Model&nbsp;
                            <EditIcon/>
                        </Fab>
                    }
                    title={'Add-On'}
                    Icon={AddOnIcon}
                />
                {items === false ? 'Error. Loading Custom Models was Failed' : null}
                {items === null ? <Spinner/> : null}
                {
                    (items || []).map(item => <Row
                        renderActions={
                            () => <React.Fragment>

                                <Fab
                                    color="primary"
                                    className={classes.button}
                                    component={Link}
                                    to={`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.inNetworkPricing}/${item.id}/edit`}
                                    variant="extended" aria-label="Edit"
                                >
                                    Edit Model&nbsp;
                                    <EditIcon/>
                                </Fab>

                                <Fab
                                    onClick={onDeleteClick(item)}
                                    className={classes.button}
                                    aria-label="Delete">
                                    <DeleteIcon/>
                                </Fab>
                            </React.Fragment>
                        }
                        title={`Custom #${item.id} ${item.name}`}
                        Icon={CustomModelIcon}
                    />)
                }


            </TableBody>
        </Table>
    </React.Fragment>
};