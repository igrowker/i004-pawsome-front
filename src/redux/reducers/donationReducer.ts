import { SET_DONATIONS, DonationActionTypes} from '../actions/donationActions';
import { DonationInterface } from '@/interfaces/DonationInterface';

interface DonationState {
  donations: DonationInterface[];
}

const initialState: DonationState = {
  donations: [],
};

const donationReducer = (state = initialState, action: DonationActionTypes): DonationState => {
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
