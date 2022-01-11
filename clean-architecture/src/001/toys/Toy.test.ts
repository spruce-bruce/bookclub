import { constructToy } from './Toy'

it("constructs a toy", () => {

	const toy = constructToy("Teddy Bear", "A Huge Brown Teddy Bear", 100);
	expect(toy.id).toBeTruthy();
});
