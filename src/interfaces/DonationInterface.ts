export interface DonationInterface {
    id: number;
    title: string;
    description: string;
    targetAmountMoney: number;
    refugee_id: string;  
    status: 'active' | 'completed' | 'canceled';
    item: string;
  }
  