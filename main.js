import { hash } from './hash.js'
import Block from './Block.js';
import Chain from './Chain.js';
import { HARDNESS} from './Settings.js';

/*	Goals 
 *		[]	Have mining agents
 *		[]	Have multithreaded mining agents 
 *
 * */


async function Main() {
	const genesisPhrase = "What is love?";
	const genesisHash = hash(genesisPhrase);
	console.log(`Genesis hash: ${genesisHash}`);

	// make chain
	const chain = new Chain(genesisHash);

	const test = 'a';


//	await chain.add({ val: "this is only a test"	});

	switch (test) {
		case 'a':
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
