import { v4 } from 'uuid'

export type Invoice = {
	id: string,
	items?: InvoiceItem[],
	total?: number,
}

export interface InvoiceItem {
	id: string,
	name: string,
	amount: number,
}

type ConstructInvoice = () => Invoice;
export const constructInvoice : ConstructInvoice = () => ({ id: v4(), items: [], total: 0 });
export const addInvoiceItem = (invoice: Invoice, item : InvoiceItem) => {
	return {
		...invoice,
		items: [...invoice.items, {...item}],
		total: invoice.total + item.amount
	}
}
