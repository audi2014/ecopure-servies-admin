import React from "react";
import ReactDOM from "react-dom";
import {withTemplate} from "./Template";
import {AppRoutes} from "./Routes";
import {wrapManagerPreferencesProvider} from "./ManagerPreferencesContext";

const AppWithTemplate = withTemplate(AppRoutes);

const AppWithManagerContext = wrapManagerPreferencesProvider(AppWithTemplate)

ReactDOM.render(<AppWithManagerContext/>, document.getElementById("root"));
