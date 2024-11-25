import { legacy_createStore as createStore } from "redux";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
