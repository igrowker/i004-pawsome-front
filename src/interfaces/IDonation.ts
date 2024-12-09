export interface DonationInterface {
    _id: string,
    refugee_id: string,
    title: string,
    description: string,
    imageUrl: string,
    isMonetaryDonation: boolean,
    targetAmountMoney: number,
    targetItemsCount: number,
}