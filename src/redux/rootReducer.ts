import { combineReducers } from "redux";
import animalReducer from "./reducers/animalReducer";

const rootReducer = combineReducers({
    animal: animalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
