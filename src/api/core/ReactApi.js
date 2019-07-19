import * as React from "react";
import {getDisplayName} from "../../Base/tools";
import {ErrorContext} from "./ModalError";

const makeApiContextValue = ({requests, state, setReqState, setReqPending, pushError}) =>
    Object.keys(requests)
        .reduce((value, reqName) => {
                value[reqName] = {};
                value[reqName].state = state.reqState[reqName] || null;
                value[reqName].pending = state.reqPending[reqName] || null;
                value[reqName].setState = next => setReqState(reqName, next);
                value[reqName].request = (...args) => {
                    const request = requests[reqName](...args)
                        .then(r => {
                            setReqState(reqName, r);
                            setReqPending(reqName, null);
                            return r;
                        })
                        .catch(e => {
                            setReqPending(reqName, null);
                            if (pushError) pushError(String(e),reqName);
                        });
                    setReqPending(reqName, request);
                    return request;
                };
                return value;
            },
            {}
        );


export const makeWrapperOfApiProvider = (requests) => {
    const ApiContext = React.createContext(null);
    const initialState = Object.keys(requests).reduce((prev, reqName) => {
        prev[reqName] = null;
        return prev;
    }, {});
    const WithApiProvider = (Component) => {
        class ComponentWithApiProvider extends React.PureComponent {
            state = {
                reqState: {...initialState},
                reqPending: {...initialState},
            };

            setReqState = (reqName, value) => {
                return this.setState({
                    reqState: {
                        ...this.state.reqState,
                        [reqName]: value

                    }
                });
            };
            setReqPending = (reqName, value) => {
                return this.setState({
                    reqPending: {
                        ...this.state.reqPending,
                        [reqName]: value

                    }
                });
            };

            render() {

                return <ErrorContext.Consumer>
                    {({pushError}) => {
                        return <ApiContext.Provider value={makeApiContextValue({
                            requests,
                            state: this.state,
                            setReqState: this.setReqState,
                            setReqPending: this.setReqPending,
                            pushError
                        })}>
                            <Component {...this.props}/>
                        </ApiContext.Provider>
                    }}
                </ErrorContext.Consumer>


            }
        }

        ComponentWithApiProvider.displayName = `${getDisplayName(Component)}`;
        return ComponentWithApiProvider;
    };

    return [
        ApiContext,
        WithApiProvider,
    ]

};