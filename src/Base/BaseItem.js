import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";

const useStyles = makeStyles(theme => ({
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
}));
const classes = useStyles;

export const BaseItemView = ({item, children, itemTitle}) => {
    const [state, setState] = useState({...item});

    const handleChange = name => event => {
        setState({...state, [name]: event.target.value});
    };
    return <form className={classes.container} noValidate autoComplete="off">
        <FormLabel>{itemTitle || 'Edit item'}</FormLabel><br/>
        {
            Object.keys(item)
                .filter(key => !['id','deleted_at','created_at','updated_at'].includes(key))
                .map(key => <TextField
                key={key}
                id={key}
                label={key}
                className={classes.textField}
                value={state[key] || ''}
                onChange={handleChange(key)}
                margin="normal"
                variant="outlined"
            />)
        }
        {children}
    </form>

};
export const BaseItem = (props) => {
    const {fetchById, selectedId, children, ...rest} = props;

    const [item, setItem] = useState(null);

    async function fetchItemToState() {
        const result = await fetchById(selectedId);
        setItem(result);
    }

    useEffect(() => {
        fetchItemToState(selectedId);
    }, [selectedId]);
    if (!item) return null;
    return children
        ? children(item, {...rest, selectedId, reload: fetchItemToState})
        : <BaseItemView key={item.id} item={item} {...rest}/>;


};
