import React from "react";
import {apiContexts} from "../../api/ContextApi";
import {Spinner} from "../../icons";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import {UserView} from "../ManageUsers/UserView";

export const ManageUsersEditUserPage = ({match}) => {
    const user_id = +match.params.user_id;
    const {users_GetPage,} = React.useContext(apiContexts.users);
    const isAnyRequestPending =
        !!users_GetPage.pending
    ;
    const user = users_GetPage.state && users_GetPage.state.items && users_GetPage.state.items[0];
    React.useEffect(() => {
        users_GetPage.request({filters: {id: user_id}});
    }, [user_id]);

    if (!user) return <Spinner/>;
    else return <Grid container justify="center" spacing={8}>
        <Grid item xs={12} md={6} lg={4}>
            <Typography style={{margin: 20}} variant="h6">
                User
            </Typography>
            <UserView {...user}/>
        </Grid>
    </Grid>

}