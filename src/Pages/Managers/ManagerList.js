import {ManagerListItem} from "./ManagerListItem";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {AddManagerDialog} from "./AddManagerDialog";
import List from "@material-ui/core/List/List";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import {DeleteManagerDialog} from "./DeleteManagerDialog";

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

export const ManagerList = ({items = [], selectedId, onSelect, onSubmitInvite, onSubmitDelete}) => {
    const [deleteId, setDeleteId] = useState(null);
    const deletedManager = items.find(m=>+m.id === deleteId);
    const deletedManagerEmail = deletedManager ? deletedManager.email_invite : '';

    const classes = useStyles();
    return <List style={{minHeight: 250}}>
        {
            items
                .map(manager => <ManagerListItem
                    key={+manager.id}
                    {...manager}
                    selectedId={selectedId}
                    onSelect={onSelect}
                    onSelectDeleteId={setDeleteId}
                />)
        }
        <ListItem><ListItemText primary={<p>&nbsp;</p>}/></ListItem>

        <DeleteManagerDialog className={classes.fab}
                             onSubmit={onSubmitDelete}
                             deleteId={deleteId}
                             onCancel={() => setDeleteId(null)}
                             operationDescription={`Delete manager ${deletedManagerEmail}`}
                             confirmationWord={deletedManagerEmail}
        />

        <AddManagerDialog className={classes.fab} onSubmit={onSubmitInvite}/>
    </List>;
};