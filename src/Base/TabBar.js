import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";

export const TabBar = ({label_render, defaultIndex=0}) => {
    const [selected, setSelected] = React.useState(defaultIndex);
    const selectedLabel = Object.keys(label_render)[selected];
    const selectedRender = label_render[selectedLabel];
    return <React.Fragment>
        <Paper square>
            <Tabs
                value={selected}
                onChange={(e, v) => setSelected(v)}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                {
                    Object.keys(label_render)
                        .map((label, key) => <Tab key={key} label={label}/>)
                }
            </Tabs>
        </Paper>
        {selectedRender ? selectedRender() : null}
    </React.Fragment>
}