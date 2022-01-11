import { PaymentServiceMock } from "./PaymentService";

it("creates a payment transaction with the correct amount", () => {
  const transaction = PaymentServiceMock.sendPayment(100);
  expect(transaction.amount).toBe(100);
});
