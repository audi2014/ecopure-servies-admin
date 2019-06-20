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
                            if (pushError) pushError(reqName, String(e));
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


//MAGIC ERROR WITH SET REQ_KEY STATE
// console.log('wrapApiProvider', getDisplayName(Component), Object.keys(requests))
// const ComponentWithApiProvider = props => {
//     const value = {};
//     const {pushError} = React.useContext(ErrorContext);
//     const [reqState, setReqState] = React.useState({...initialState});
//     const [reqPending, setReqPending] = React.useState({...initialState});
//     const setPending = (reqName, value) => setReqPending(({
//         ...reqPending,
//         [reqName]: value
//     }));
//     const setState = (reqName, value) => {
//
//
//         console.log('setState',
//             {
//                 reqName,
//                 value,
//                 prev: reqState,
//                 next: {
//                     ...reqState,
//                     [reqName]: value
//                 }
//             });
//         return setReqState({
//             ...reqState,
//             [reqName]: value
//         });
//     }
//
//
//     Object.keys(initialState)
//         .forEach(reqName => {
//             value[reqName] = {};
//             value[reqName].state = reqState[reqName] || null;
//             value[reqName].pending = reqPending[reqName] || null;
//             value[reqName].setState = next => setState(reqName, next);
//             value[reqName].request = (...args) => {
//                 const request = requests[reqName](...args)
//                     .then(r => {
//                         setState(reqName, r);
//                         setPending(reqName, null);
//                         return r;
//                     })
//                     .catch(e => {
//                         setPending(reqName, null);
//                         if (pushError) pushError(reqName, String(e));
//                     });
//                 setPending(reqName, request);
//                 return request;
//             };
//         });
//
//     if (Object.keys(requests).includes('inNetworkModel_GetById')) {
//         // console.log('inNetworkModel', {...value})
//         console.log('inNetworkModel re-render')
//     }
//
//     return <ApiContext.Provider value={value}>
//         <Component {...props}/>
//     </ApiContext.Provider>
// };

