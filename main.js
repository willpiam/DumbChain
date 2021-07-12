import { hash } from './hash.js'
import Block from './Block.js';
import Chain from './Chain.js';
import { HARDNESS} from './Settings.js';
import Miner from './Miner.js';

/*	Goals 
 *		[x]	Have mining agents
 *		[]	Have multithreaded mining agents 
 *		[]	Thread lock to ensure the same block is never mined twice
 * */

async function Main() {
	const genesisPhrase = "What is love?";
	const genesisHash = hash(genesisPhrase);
	
	console.log(`Genesis hash: ${genesisHash}`);

	const chain = new Chain(genesisHash);

	const test = 'a';
	switch (test) {
		case 'a':
			{
				// compeeting to mine same block
				await Promise.all(
					[
						new Miner({ val: "A" }, chain).saveToChain(10),
						new Miner({ val: "B" }, chain).saveToChain(9),
						new Miner({ val: "C" }, chain).saveToChain(8),
						new Miner({ val: "D" }, chain).saveToChain(7),
						new Miner({ val: "E" }, chain).saveToChain(6),
						new Miner({ val: "F" }, chain).saveToChain(5),
						new Miner({ val: "G"}, chain).saveToChain(4),
						new Miner({ val: "H" }, chain).saveToChain(),
						new Miner({ val: "William Was Here" }, chain).saveToChain(),
						new Miner({ val: "Bitcoin 4ever" }, chain).saveToChain(),
						new Miner({ val: "should we make a token" }, chain).saveToChain(),
					]
				);
				break;
			}
		case 'a_old':
			{
				// compeeting to mine same block
				await Promise.all(
					[
						chain.add({ val: "A" }),
						chain.add({ val: "B this is a message" }),
						chain.add({ val: "C send 533 to 0x7w384g" }),
						chain.add({ val: "D" }),
						chain.add({ val: "E" }),
						chain.add({ val: "F" }),
						chain.add({ val: "G is a letter 2." }),
						chain.add({ val: "H" }),
					]
				);
				break;
			}

		case 'b':
			{
				// one after the other
				await chain.add({ val: "A" });
				await chain.add({ val: "B" });
				await chain.add({ val: "C" });
				await chain.add({ val: "D this is me" });
				await chain.add({ val: "E" });
				await chain.add({ val: "F" });
				await chain.add({ val: "G" });
				await chain.add({ val: "H" });
				break;
			}

		case 'c':
			{
				// combitition beteen two miners

				await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "WDD WAZ HERE" })]) ;
				await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "hellooooo" })]);
				await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "hwefooooo" })]);
				await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "hellsdfoo" })]);
				await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "helloooss" })]);
				await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "dsfsooooo" })]);
				await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "hellsdfoo" })]);
				await Promise.race([ chain.add({val: 'a'}),	 chain.add({ val: "hellooofghi"})]);
				break;
			}
		default: 
			console.warn('not a valid test!');
			break;
	}

	//chain.add_BAD({ val: "hellooooo" });

	chain.print();

	if (chain.verify())
		console.log('chain looks good');
	else
		console.log('chain has been tampered');
}

Main();
