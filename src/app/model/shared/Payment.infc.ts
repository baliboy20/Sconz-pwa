// Payment

export interface Payment {
  amount_total_pence?: number;
  id: string;
  mode: string;
  payment_intent: string;
  payment_status: string;
}
