import { SET_DONATIONS, DonationActionTypes} from '../actions/DonationActionTypes';
import { DonationInterface } from '@/interfaces/DonationInterface';

export interface DonationState {
  donations: DonationInterface[];
}

const initialState: DonationState = {
  donations: [],
};

const donationReducer = (state = initialState, action: DonationActionTypes) => {
  switch (action.type) {
    case SET_DONATIONS:
      return {
        ...state,
        donations: action.payload,
      };
    default:
      return state;
  }
};

export default donationReducer;
