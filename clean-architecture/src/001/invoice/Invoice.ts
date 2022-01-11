import { v4 } from "uuid";
import { PaymentService } from "./PaymentService";

export type Invoice = {
  id: string;
  items?: InvoiceItem[];
  total?: number;
  status: "unpaid" | "paid";
};

export interface InvoiceItem {
  id: string;
  name: string;
  amount: number;
}

type ConstructInvoice = () => Invoice;
export const constructInvoice: ConstructInvoice = () => ({
  id: v4(),
  items: [],
  total: 0,
  status: "unpaid",
});

export const addInvoiceItem = (invoice: Invoice, item: InvoiceItem) => {
  return {
    ...invoice,
    items: [...invoice.items, { ...item }],
    total: invoice.total + item.amount,
  };
};

type PayInvoice = (paymentService: PaymentService, i: Invoice) => Invoice;
export const payInvoice: PayInvoice = (paymentService, invoice) => {
  paymentService.sendPayment(invoice.total);
  return {
    ...invoice,
    items: [...invoice.items],
    status: "paid",
  };
};
