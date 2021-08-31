import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
// import getInitState from "./initState";
import getInitState from './mainState'
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(rootReducer, getInitState(), composeWithDevTools(applyMiddleware(thunk)))

export default store
