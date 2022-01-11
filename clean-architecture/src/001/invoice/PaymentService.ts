import { v4 } from "uuid";

export type PaymentTransaction = {
  id: "string";
  amount: number;
  result: "error" | "success";
};

export interface PaymentService {
  sendPayment: (amount: number) => PaymentTransaction;
}

type Call = { amount: number };
let calls: Call[] = [];
export const getCalls = () => calls;
export const resetCalls = () => {
  calls = [];
};

export const PaymentServiceMock: PaymentService = {
  sendPayment: (amount) => {
    calls = [...calls, { amount }];
    return {
      id: v4(),
      amount: amount,
      result: "success",
    } as PaymentTransaction;
  },
};
