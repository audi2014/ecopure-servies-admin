import React from "react";
import {apiContexts} from "../../api/ContextApi";
import {Spinner} from "../../icons";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import {UserView} from "./UserView";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";

export const ManageUsersEditUserPage = ({match}) => {
    const user_id = +match.params.user_id;
    const {users_GetFirstById, users_RequireTokenById, users_cardGetById} = React.useContext(apiContexts.users);

    const user = users_GetFirstById.state;
    React.useEffect(() => {
        users_GetFirstById.request(user_id);
        users_cardGetById.request(user_id);
    }, [user_id]);

    React.useEffect(() => {
        if (user && !user.token) {
            users_RequireTokenById.request(user.id).then(token => {
                users_GetFirstById.setState({...user, token});
            })
        }
    }, [user && user.token]);


    const card = users_cardGetById.state;
    const pending = users_cardGetById.pending;

    if (users_GetFirstById.pending) return <Spinner/>;
    else if (!user) return null;
    else if (!user.token) return (
        <Typography style={{margin: 20}} variant="h6">Updating User Token...<Spinner/></Typography>)
    else return <Grid container justify="center" spacing={8}>
            <Grid item xs={12} md={6} lg={4}>
                <Typography style={{margin: 20}} variant="h6">
                    User
                </Typography>
                <UserView {...user}/>
                {card && !pending ? <ModalCard {...card}/> : <Spinner/>}
            </Grid>
        </Grid>

};


const CARD_FIELD_TITLE = {
    'cc_number': 'cc number',
    'exp_date': 'exp date',
    'cvv': 'cvv',
    'cc_zip': 'cc zip',
};
const ModalCard = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    return (
        <React.Fragment>
            <Button
                onClick={handleOpen}
                color="secondary"
            >
                Card
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    Card Information
                </DialogTitle>
                <CardContent {...props}/>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
const CardContent = (props) => <DialogContent>
    <Table>
        <TableBody>
            {
                Object.keys(CARD_FIELD_TITLE).map(field => (
                    <TableRow key={field}>
                        <TableCell component="th" scope="row">
                            {CARD_FIELD_TITLE[field] || field}
                        </TableCell>
                        <TableCell align="right">{'' + props[field]}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
</DialogContent>;