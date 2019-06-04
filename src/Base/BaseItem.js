import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Button from "@material-ui/core/Button/Button";


import DeleteIcon from '@material-ui/icons/HighlightOff';
import RestoreIcon from '@material-ui/icons/CheckCircleOutline';
import SaveIcon from '@material-ui/icons/Done';
import ResetIcon from '@material-ui/icons/History';
import Grid from "@material-ui/core/Grid/Grid";
import {Spiner} from "../icons";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    root: {
        flexGrow: 1,
    },
}));

const getDiff = (source, state) => {
    let count = 0;
    const v = Object.keys(source).reduce((prev, key) => {
        if (state[key] !== source[key]) {
            prev[key] = state[key];
            count++;
        }
        return prev;
    }, {});
    return count > 0 ? v : null;
};

const BaseItemView = ({editableData, itemTitle, isDisabled, children, onToggleDisabled, save, isAdd}) => {
    const classes = useStyles();
    const [state, setState] = useState({...editableData});
    const handleChange = name => event => {
        setState({...state, [name]: event.target.value});
    };
    const diff = getDiff(editableData, state);
    const onReset = () => setState({...editableData});
    const onSave = () => save(isAdd ? state : diff);
    return <form className={classes.container} noValidate autoComplete="off">

        {save ? (<div>

            <Typography style={{margin: 20}} variant="h6">{itemTitle || 'Edit item'}</Typography>
            {
                Object.keys(editableData)
                    .map(key => (
                        <FormControl fullWidth key={key}>
                            <TextField
                                key={key}
                                id={key}
                                label={key.replace(/_/g,' ')}
                                className={classes.textField}
                                value={state[key] || ''}
                                onChange={handleChange(key)}
                                margin="normal"
                                variant="outlined"
                            />
                        </FormControl>
                    ))
            }

            <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                direction="row"
            >
                {
                    onToggleDisabled ? (
                        <Button variant="contained" color="default" className={classes.button}
                                onClick={onToggleDisabled}>
                            {
                                isDisabled
                                    ? 'Enable'
                                    : 'Disable'
                            }
                            {
                                isDisabled
                                    ? <RestoreIcon className={classes.rightIcon}/>
                                    : <DeleteIcon className={classes.rightIcon}/>
                            }
                        </Button>
                    ) : null
                }
                {
                    save && !isAdd
                        ? (<Button disabled={!diff} variant="contained" color="default" className={classes.button}
                                   onClick={onReset}>
                            Reset
                            <ResetIcon className={classes.rightIcon}/>
                        </Button>)
                        : null
                }
                {
                    save
                        ? (<Button disabled={!diff && !isAdd} variant="contained" color="primary"
                                   className={classes.button}
                                   onClick={onSave}>
                            {isAdd ? 'Create' : 'Save'}
                            <SaveIcon className={classes.rightIcon}/>
                        </Button>)
                        : null
                }


            </Grid>

        </div>) : null}


        <Grid container spacing={2} className={classes.dense}>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    </form>

};

const BaseItemCreation = ({insertByData, creationTemplate, children, ...rest}) => {
    if (!insertByData || !creationTemplate)
        return <Typography style={{margin: 20}} variant="h6">Creation not allowed</Typography>;

    const {id, deleted_at, created_at, updated_at, location_id, building_id, ...editableData} = creationTemplate;
    const childProps = {
        ...rest,
        isAdd: true,
        save: (editableData) => insertByData({...creationTemplate, ...editableData}),
        editableData,
    };
    return <BaseItemView key={'add'} {...childProps}>{children(creationTemplate, childProps)}</BaseItemView>;
};

const BaseItemUpdation = (props) => {
    if (!props.fetchById) return <Typography style={{margin: 20}} variant="h6">FetchById not allowed</Typography>;


    const {fetchById, selectedId, children, ...rest} = props;

    const [item, setItem] = useState(null);

    async function fetchItemToState() {
        const result = await fetchById(selectedId);
        if (result) {
            setItem(result);
        } else {
            setItem(false);
        }
    }

    useEffect(() => {
        fetchItemToState(selectedId);
    }, [selectedId]);
    if (item === null) return <Spiner/>;
    if (item === false) return <Typography style={{margin: 20}} variant="h6">Item not found</Typography>;

    const {id, deleted_at, created_at, updated_at, location_id, building_id, ...editableData} = item;
    const isDisabled = !!deleted_at;
    const onToggleDisabled = props.updateById
        ? (() => props.updateById(id, {
            deleted_at: isDisabled
                ? null
                : Math.round((new Date()).getTime() / 1000)
        })
            .then(r => setItem(r))
            .then(() => props.reloadListItems()))
        : null;

    const save = props.updateById
        ? ((diff) => props.updateById(id, diff)
            .then(r => setItem(r))
            .then(() => props.reloadListItems()))
        : null;

    const childProps = {
        ...rest,
        isAdd: false,
        selectedId,
        isDisabled,
        onToggleDisabled: onToggleDisabled,
        save: save,
        reload: fetchItemToState,
        item,
        editableData,
    };



    return <BaseItemView key={item.id} {...childProps}>{children(item, childProps)}</BaseItemView>;


};


export const BaseItem = ({isAdd, ...props}) => isAdd ? <BaseItemCreation {...props}/> : <BaseItemUpdation {...props}/>
