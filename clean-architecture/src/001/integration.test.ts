import { constructInvoice, addInvoiceItem } from './invoice/Invoice';
import { constructToy } from './toys/Toy';

it("allows me to add toys to invoices without invoices having to know about toys", () => {
	const invoice = constructInvoice();
	const teddyBear = constructToy('Teddy Bear', 'The literal best teddy bear', 100);

	const invoiceItem = {
		id: teddyBear.id,
		name: teddyBear.name,
		amount: teddyBear.price,
	}

	const updatedInvoice = addInvoiceItem(invoice, invoiceItem);
	expect(updatedInvoice.total).toBe(teddyBear.price);
	expect(updatedInvoice.items).toBeTruthy();

	if(invoice.items) {
		expect(updatedInvoice.items[0]).toEqual(invoiceItem);
	}
});
