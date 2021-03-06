import React from "react";
import ReactDOM from "react-dom";
import {withTemplate} from "./Template";

import {AppRoutes} from "./Routes";
import {wrapApiApplication} from "./api/ContextApi";

const AppWithApi = wrapApiApplication(AppRoutes);
const AppWithTemplate = withTemplate(AppWithApi);

ReactDOM.render(<AppWithTemplate/>, document.getElementById("root"));
