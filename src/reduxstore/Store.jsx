import { createStore,applyMiddleware } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import { Reducer } from "./Reducer";
const mystore=createStore(Reducer,applyMiddleware(logger,thunk))

export default mystore