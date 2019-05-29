import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

export const BasePage = ({
                             ListComponent,
                             ItemComponent,
                             fetchItems,
                             fetchById,
                             renderListItemTitle,
                             listItemPath,
                             renderListItemTo,
                             selectedId,
                             itemTitle,
                             ListItemIcon,
                         }) => {

    const classes = useStyles();

    const [items, setItems] = useState([]);


    useEffect(() => {
        async function fetchItemsToState() {
            const result = await fetchItems();
            if(result) {
                setItems(result);
            }
        }

        fetchItemsToState();
    }, []);



    return <div>
        <main>
            <Grid container spacing={3}>
                <Grid item xs={12} md={selectedId ? 2 : 12} lg={selectedId ? 2 : 12}>
                    <Paper>
                        <ListComponent
                            items={items}
                            renderListItemTitle={renderListItemTitle}
                            renderListItemTo={renderListItemTo}
                            selectedId={selectedId}
                            ListItemIcon={ListItemIcon}
                        /></Paper>
                </Grid>
                {
                    selectedId
                        ? <Grid item xs={12} md={8} lg={8}>
                            <Paper className={classes.root}>
                                <ItemComponent
                                    setListItems={setItems}
                                    items={items}
                                    fetchById={fetchById}
                                    selectedId={selectedId}
                                    itemTitle={itemTitle}
                                />
                            </Paper>
                        </Grid>
                        : null
                }
            </Grid>

        </main>
    </div>;
};