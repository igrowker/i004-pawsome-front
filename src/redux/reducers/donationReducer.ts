import { SET_DONATION_INFO, SetDonationInfoAction } from "../actions/DonationIndexType";



export interface DonationState {
  refugee_id: string;
  title: string;
}

const initialState: DonationState = {
  refugee_id: "",
  title: ""
};

const donationReducer = (state = initialState, action: SetDonationInfoAction): DonationState => {
  switch (action.type) {
    case SET_DONATION_INFO:
      return {
        ...state,
        refugee_id: action.payload.refugee_id,
        title: action.payload.title
      };
    default:
      return state;
  }
};

export default donationReducer;

