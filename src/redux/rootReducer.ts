import { combineReducers } from "redux";
import animalReducer from "./reducers/animalReducer";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import favoritesReducer from "./reducers/favoritesReducer";
import volunteeringReducer from "./reducers/volunteeringReducer";
<<<<<<< HEAD
import notificationReducer from "./notificationSlice";
=======
import notificationReducer from "./notificationSlice"
>>>>>>> 0e892b950966b67a18c3583d0571ff661957a35a
import adoptionRequestReducer from "./reducers/adoptRequestReducer";
import donationReducer from "./reducers/donationReducer";

const rootReducer = combineReducers({
  animal: animalReducer,
  auth: authReducer,
  user: userReducer,
  favorites: favoritesReducer,
  volunteering: volunteeringReducer,
  notifications: notificationReducer,
  adopt: adoptionRequestReducer,
  donations : donationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
