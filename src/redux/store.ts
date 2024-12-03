import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  Reducer,
} from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth","donation"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as Reducer<Partial<RootState>>
);
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Configuración del store con thunk como middleware
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
