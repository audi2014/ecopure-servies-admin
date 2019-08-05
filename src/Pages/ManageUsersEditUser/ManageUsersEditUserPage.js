import React from "react";
import {apiContexts} from "../../api/ContextApi";
import {Spinner} from "../../icons";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import {If} from "../../Base/If";
import {ModalCard} from "../BaseManageUsers/Card";
import {UserView} from "../BaseManageUsers/UserView";


export const ManageUsersEditUserPage = ({match}) => {
    const user_id = +match.params.user_id;
    const {users_GetFirstById, users_RequireTokenById, users_cardGetById, users_addBillingInfo} = React.useContext(apiContexts.users);

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

    const handleUpdateCard = data => {
        return users_addBillingInfo.request({
            ...data,
            email: user.email,
        }).then(() => {
            return users_cardGetById.request(user_id);
        })
    };

    if (users_GetFirstById.pending) return <Spinner/>;
    else if (!user) return null;
    else if (!user.token) return (
        <Typography style={{margin: 20}} variant="h6">
            Updating User Token...<Spinner/>
        </Typography>
    );
    else return <Grid container justify="center" spacing={8}>
            <Grid item xs={12} md={6} lg={4}>
                <Typography style={{margin: 20}} variant="h6">
                    User
                </Typography>
                <If value={card && !pending}>
                    <ModalCard
                        {...card}
                        onSubmit={handleUpdateCard}
                        pending={!!users_addBillingInfo.pending}/>
                    <Spinner/>
                </If>
                <UserView {...user}/>
            </Grid>
        </Grid>

};

