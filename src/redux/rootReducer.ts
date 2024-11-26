import { combineReducers } from "redux";
import animalReducer from "./reducers/animalReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  animal: animalReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
