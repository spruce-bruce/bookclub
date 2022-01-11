import { v4 } from "uuid";

import {
  constructInvoice,
  addInvoiceItem,
  payInvoice,
  Invoice,
  InvoiceItem,
} from "./Invoice";
import { PaymentServiceMock, getCalls, resetCalls } from "./PaymentService";

it("creates an Invoice object with a random id", () => {
  const newInvoice: Invoice = constructInvoice();
  const secondNewInvice: Invoice = constructInvoice();

  expect(newInvoice.id).not.toBe(secondNewInvice.id);
});

it("creates an Invoice object with an empty InvoiceItems array", () => {
  const invoice = constructInvoice();
  expect(invoice.items).toEqual([]);
});

it("adds an invoice item to the invoice", () => {
  const invoice = constructInvoice();

  const invoiceItem: InvoiceItem = {
    id: v4(),
    name: "test item",
    amount: 123.45,
  };
  const updatedInvoice = addInvoiceItem(invoice, invoiceItem);

  expect(updatedInvoice.items).toBeTruthy();
  if (updatedInvoice.items) {
    expect(updatedInvoice.items[0]).toEqual(invoiceItem);
  }
});

it("adds an invoice item and updates the total amount on the invoice", () => {
  const invoiceItemOne = { id: v4(), name: "test 1", amount: 10 };
  const invoiceItemTwo = { id: v4(), name: "test 1", amount: 10 };

  const invoice = addInvoiceItem(constructInvoice(), invoiceItemOne);
  const updatedInvoice = addInvoiceItem(invoice, invoiceItemTwo);
  expect(updatedInvoice.total).toBe(20);
});

it("updates an invoice status to paid when I pay the invoice", () => {
  resetCalls();
  const invoice = constructInvoice();
  const paidInvoice = payInvoice(PaymentServiceMock, invoice);
  expect(paidInvoice.status).toBe("paid");
});

it("calls out to payment processor with the correct amount", () => {
  resetCalls();
  const invoice = constructInvoice();
  const invoiceWithItem = addInvoiceItem(invoice, {
    id: v4(),
    name: "test item",
    amount: 100,
  });
  const paidInvoice = payInvoice(PaymentServiceMock, invoiceWithItem);

  const paymentCalls = getCalls();
  expect(paymentCalls.length).toBe(1);
  expect(paymentCalls[0].amount).toBe(100);
});
