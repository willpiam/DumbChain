import { hash } from './hash.js'
import Block from './Block.js';
import { HARDNESS, GetZeros } from './Settings.js';

// todo---------------------------
// lock the array (acceptBlock()) 
// check proofs (verify())

export default class Chain {

	constructor(genesisHash) {
		this.blocks = [new Block(genesisHash, {val: 'banks suck'}, {solution: 128, full: 821})];
	}

	getLatestBlock() {
		return this.blocks[this.blocks.length - 1];
	}

	checkProof (_proof) {

		const hashOp = hash((Math.pow(_proof.solution, 2) - Math.pow(this.getLatestBlock().getProof().solution, 2)).toString(16));

		if (hashOp.substring(0, HARDNESS) === GetZeros(HARDNESS))
			return true;

		console.log(`proof bad`);
		return false;

	}

	acceptBlock(prvHsh, data, proof) {


			if (this.checkProof(proof)) {

				// LOCK THE ARRAY
				//
				// check that this prvHsh still matches hash of most recent block
				if (prvHsh === this.getLatestBlock().getHash()) {
					this.blocks.push(new Block(prvHsh, data, proof));
					console.log(`\tPoW accepted. You're block has been added.`);
					return true;
				}
				else {
					console.log(`block rejected`);
					return false;
				}
			}
			else {
				console.log(`invlid proof. Block should be regected.`);
				return false;
			}

		return false;
	}

	verify() {
		for (let i = 1; i < this.blocks.length; i++){

			// check hash history
			if (this.blocks[i].previousHash !== this.blocks[i - 1].getHash())
				return false;

			// check each proof
			
		}
		return true;
	}
	
	/*
	 *
	 * */
	add(data, proof) {
		if (proof === false){
			console.log(`stub: inside add() block already mined`);
			return false;
		}
		const success = this.acceptBlock(
			this.blocks[this.blocks.length - 1].getHash(),
			data,
			proof,
		);
		return success;
	}

	print() {
		console.log(`CHAIN \nblock hash\t\t\t\t\tprevious hash`);
		this.blocks.forEach(block => console.log(`${hash(JSON.stringify(block))}\t${block.previousHash}\t${JSON.stringify(block.data)}`))
	}
}
























