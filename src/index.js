import React from "react";
import ReactDOM from "react-dom";
import {withTemplate} from "./Template";
import {AppRoutes} from "./Routes";

const AppWithTemplate = withTemplate(AppRoutes);

const rootElement = document.getElementById("root");
ReactDOM.render(<AppWithTemplate/>, rootElement);
