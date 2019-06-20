import React from "react";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {CancelButton, SubmitButton} from "./BaseInput";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(theme => ({

    cell: {
        '&:hover': {
            backgroundColor: '#C3C3C3'
        },
        cursor: 'text',
    },
}));


export const PriceCellEditable = ({
                                      tooltipClassName,
                                      edition,
                                      setEdition,
                                      update,
                                      formClassName,
                                      children,
                                      ...props
                                  }) => {
    const [state, setState] = React.useState(edition);
    const mergeState = nextState => setState({...state, ...nextState});

    const onCancelClick = () => setEdition({});
    return <TableCell {...props}>
        <form className={formClassName} onSubmit={e => {
            e.preventDefault();
            update(state);
        }}>
            {children({state, setState: mergeState,})}
            {
                tooltipClassName
                    ? <div className={tooltipClassName}>
                        <CancelButton key={'Cancel'} onClick={onCancelClick}/>
                        <SubmitButton key={'Submit'}/>
                    </div>
                    : [
                        <CancelButton key={'Cancel'} onClick={onCancelClick}/>,
                        <SubmitButton key={'Submit'}/>
                    ]
            }
        </form>

    </TableCell>
};

export const PriceCell = ({disabled, onClick, children, ...props}) => {

    const classes = useStyles();
    if (disabled) return <TableCell {...props} />;
    return <TableCell {...props} onClick={onClick} className={classes.cell}>
        {children()}
    </TableCell>
};