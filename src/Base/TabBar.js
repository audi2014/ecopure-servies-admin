import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import {Link as RouterLink} from "react-router-dom";
import { matchPath } from 'react-router-dom';

export const TabBar = ({items, history,location}) => {

    const selectedIndex = items.findIndex(item => matchPath(location.pathname, item.href));
    console.log('selectedIndex',selectedIndex)

    const selectedRender = items[selectedIndex].render;
    return <React.Fragment>
        <Paper square>
            <Tabs
                onChange={(e,v)=>{
                    history.push(items[v].href);
                }}
                value={selectedIndex}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                {
                    items
                        .map(
                            ({label, render, href}, key) => <Tab
                                key={key}
                                label={label}
                                component={RouterLink}
                                to={href}
                                onClick={e => e.preventDefault()}
                            />
                        )
                }
            </Tabs>
        </Paper>
        {selectedRender ? selectedRender() : null}
    </React.Fragment>
}