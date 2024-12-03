export interface AdoptionRequest {
    petName: string;
    status: "pending" | "approved" | "rejected"; 
    date: string;
  }
  