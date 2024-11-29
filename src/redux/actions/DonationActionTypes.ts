import { DonationInterface } from "@/interfaces/DonationInterface";
export const SET_DONATIONS = 'SET_DONATIONS';


interface SetDonationsAction {
  type: typeof SET_DONATIONS;
  payload: DonationInterface[];
}

export const setDonations = (donations: DonationInterface[]): SetDonationsAction => ({
  type: SET_DONATIONS,
  payload: donations,
});

export type DonationActionTypes = SetDonationsAction;