In this code we imageine a hypothetical e-commerce app that will handle lots of different kinds of products. Invoices, or bills, are an important concept that are coded up in the `./invoice` directory.

## Business rules:

- Invoices have a list of line items. Each line item has a price, and the invoice total is the sum of each line item's price.
- Invoices can be paid.

## Architecture/Design constraints:

- code in the `./invoice` directory is not allowed to depend on any code outside of the invoice directory
- code in the `./invoice` directory is not allowed to depend on any third party services

## Principles highlighted
The D in SOLID stands for dependency injection principle. In order to prevent the `invoice` code from having to know anything about specific products or payment gateways we declared a couple of rules that prevent me from depending directly on stripe. But, I do want the invoice code to control when we send payments to stripe.

So how do I resolve that?

I allow the invoice code to declare an interface, `PaymentServiceInterface` and it depends directly on that interface. At run time, the calling code (in this case a unit test) will instantiate an object that implements the `PaymentServiceInterface` and pass it to my invoice code. The invoice code can take any implementation of the interface without having to know anything about its specific details.
