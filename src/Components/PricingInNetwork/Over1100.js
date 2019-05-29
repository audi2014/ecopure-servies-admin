import React from 'react';

import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button/Button";
import {updateBuildingById} from "../../api/Api";

const useStyles = makeStyles(theme => ({

    margin: {
        margin: theme.spacing(1),
    },
}));

export const Over1100 = ({listItem, setListItems, items}) => {
    const classes = useStyles();
    const [value, handleChange] = React.useState(listItem.over1100sqft_cents ? (listItem.over1100sqft_cents / 100).toFixed(2) : 0);
    const [updating, setUpdating] = React.useState(false);
    const update = () => {
        setUpdating(true);
        updateBuildingById(listItem.id, {over1100sqft_cents: Math.round(value * 100)})
            .then(r => {
                setUpdating(false);
                setListItems([
                    ...items.filter(v => +v.id !== +listItem.id),
                    {...listItem, over1100sqft_cents: value}
                ]);
            })
    };

    return <div>
        <form className={classes.root}>
            <br/>
            <InputLabel className={classes.margin} htmlFor="over1100sqft_cents">Over 1,100 sq.ft</InputLabel>
            <FormControl className={classes.margin}>
                <Input
                    id="over1100sqft_cents"
                    type='number'
                    step={0.01}
                    min={0}
                    value={value}
                    onChange={(e) => handleChange(e.currentTarget.value)}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                /></FormControl>
            <Button
                disabled={updating}
                variant="outlined"
                color="primary"
                onClick={update}
            >
                Save
            </Button>
        </form>
    </div>
}