export const SET_DONATION_INFO = "SET_DONATION_INFO";

export interface SetDonationInfoAction {
  type: typeof SET_DONATION_INFO;
  payload: { refugee_id: string; title: string };
}

export const setDonationInfo = (refugee_id: string, title: string): SetDonationInfoAction => ({
  type: SET_DONATION_INFO,
  payload: { refugee_id, title }
});
