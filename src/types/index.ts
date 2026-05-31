export type MerchantType = "grocery" | "medical" | "retail" | "ATM_이체";

export type SeniorScreen =
  | "home"
  | "method"
  | "confirm"
  | "waiting"
  | "done"
  | "declined";

export type PaymentMethodId = "simple" | "card" | "qr";

export type TransactionStatus = "approved" | "declined" | "pending";

export type ActivityTone = "neutral" | "success" | "warning" | "danger";

export interface Merchant {
  id: string;
  name: string;
  amount: number;
  type: MerchantType;
  expected: string;
  category: string;
}

export interface PendingApproval {
  merchant: string;
  amount: number;
  type: MerchantType;
  isAnomaly: boolean;
  ts: number;
}

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  type: MerchantType;
  status: TransactionStatus;
  isAnomaly?: boolean;
  ts: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  tone: ActivityTone;
  ts: number;
}

export interface LastPayment {
  merchant: string;
  amount: number;
  status: "approved" | "declined";
  isAnomaly?: boolean;
}

export interface AppState {
  threshold: number;
  balance: number;
  cardFrozen: boolean;
  selectedMerchant: Merchant | null;
  selectedPaymentMethod: PaymentMethodId | null;
  pendingApproval: PendingApproval | null;
  transactions: Transaction[];
  activities: Activity[];
  seniorScreen: SeniorScreen;
  lastPayment: LastPayment | null;
}
