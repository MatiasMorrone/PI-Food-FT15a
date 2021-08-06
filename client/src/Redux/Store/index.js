import { createStore, applyMiddleware } from "redux";
import reducer from "../Reducer";
import thunk from "redux-thunk";

var store = createStore(reducer, applyMiddleware(thunk));

export default store;
