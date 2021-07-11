import { hash } from './hash.js'
import Block from './Block.js';
import Chain from './Chain.js';

/*	Goals 
 *		[]	Have mining agents
 *		[]	Have multithreaded mining agents 
 *
 * */

const HARDNESS = 2;

async function Main() {
	const genesisPhrase = "What is love?";
	const genesisHash = hash(genesisPhrase);
	console.log(`Genesis hash: ${genesisHash}`);

	// make chain
	const chain = new Chain(genesisHash);
	/*	await Promise.all(
		[
		chain.add({ val: "A" }),
		chain.add({ val: "B" }),
		chain.add({ val: "C" }),
		chain.add({ val: "D" }),
		chain.add({ val: "E" }),
		chain.add({ val: "F" }),
		chain.add({ val: "G" }),
		chain.add({ val: "H" }),
		]
	);

*/
		await chain.add({ val: "A" });
		await chain.add({ val: "B" });
		await chain.add({ val: "C" });
		await chain.add({ val: "D" });
		await chain.add({ val: "E" });
		await chain.add({ val: "F" });
		await chain.add({ val: "G" });
		await chain.add({ val: "H" });
	

	/*
	await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "WDD WAZ HERE" })]) ;
	await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "hellooooo" })]);
	await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "hwefooooo" })]);
	await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "hellsdfoo" })]);
	await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "helloooss" })]);
	await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "dsfsooooo" })]);
	await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "hellsdfoo" })]);
	await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "hellooofghi"})]);
	*/
	//chain.add_BAD({ val: "hellooooo" });

	chain.print();

	if (chain.verify())
		console.log('chain looks good');
	else
		console.log('chain has been tampered');
}

Main();
