import { v4 } from 'uuid';

export type Toy = {
	id : string,
	name : string,
	description : string
	price: number
}

type ConstructToy = (name: string, description: string, price: number) => Toy
export const constructToy: ConstructToy = (name, description, price) => ({
	id: v4(),
	name,
	description,
	price
});
