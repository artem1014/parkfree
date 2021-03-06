import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import getInitState from './mainState'
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(rootReducer, getInitState(), composeWithDevTools(applyMiddleware(thunk)))

store.subscribe(() => {
  window.localStorage.setItem('user', JSON.stringify(store.getState()))
})

export default store
