import React from "react";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {CancelButton, SubmitButton} from "./BaseInput";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(theme => ({

    cell: {
        '&:hover': {
            backgroundColor: '#C3C3C3'
        }
    },
}));

export const centsToDollars = cents => cents ? (cents / 100).toFixed(2) : 0;
export const dollarsToCents = dollars => Math.round(dollars * 100) || 0;
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
    const classes = useStyles();
    const mergeState = nextState => setState({...state, ...nextState});

    const onCancelClick = () => setEdition({});

    return <TableCell {...props} className={classes}>
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
    if (disabled) return <TableCell {...props} />;
    return <TableCell {...props} onClick={onClick} >
        {children()}
    </TableCell>
};