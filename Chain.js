import { hash } from './hash.js'
import Block from './Block.js';
import { HARDNESS } from './Settings.js';

export default class Chain {

	constructor(genesisHash) {
		this.blocks = [new Block(genesisHash, {}, 1)];
	}

	getLatestBlock() {
		return this.blocks[this.blocks.length - 1];
	}

	async checkProof (_proof) {

		/*	NaiveApproch()
		 *	Description: The naive approch to proof checking
		 *		STEPS:
		 *			- Take proof
		 *			- Do entire proof
		 *			- compare provided proof with the proof we did
		 *		THE PROBLEM:
		 *			It takes just as much work to check a proof as it does to generate a proof
		 *	
		 *	William Doyle
		 *	July 11th 2021
		 *
		 * */
		async function NaiveApproch(_this, _proof) {
			const myproof = await _this.proofOfWork(_this.getLatestBlock().getProof());
			if (_proof == myproof) 
				return true;
			return false;
		}

		return await NaiveApproch(this, _proof);
	}

	async acceptBlock(prvHsh, data, proof) {

		if (prvHsh === this.getLatestBlock().getHash()) {

			// This block has (probably) not yet been blocked

			if (await this.checkProof(proof)) {

				// LOCK THE ARRAY
				/*?how?*/
				// check that this prvHsh still matches hash of most recent block
				if (prvHsh == this.getLatestBlock().getHash()) {
					this.blocks.push(new Block(prvHsh, data, proof));
					console.log(`\tPoW accepted. You're block has been added.`);
					return true;
				}
				else {
					console.log(`COULD NOT WRITE BLOCK. THIS BLOCK HAS ALREADY BEEN MINED`);
					return false;
				}
			}
			else {
				console.log(`invlid proof. Block should be regected.`);
				return false;
			}
		}

		return false;

	}

	verify() {
		for (let i = 1; i < this.blocks.length; i++){

			// check hash history
			if (this.blocks[i].previousHash !== this.blocks[i - 1].getHash())
				return false;

			// check proofs [1. do the proof (i know its slow, we will find a way to check the proof faster than doing the proof later), 2. compair your answer to what they say is the proof]
			

		}
		return true;
	}

	async proofOfWork (prevProof) {
		const startTime = new Date().getTime();
		let newProof = 1;
		let checkProof = false;

		do {
			const hashOp = hash((Math.pow(newProof, 2) - Math.pow(prevProof, 2)).toString(16));
			const numZeros = HARDNESS;

			function GetZeros (_nzeros) {
				return "".padStart(_nzeros, "0");
			}

			if (hashOp.substring(0, numZeros) === GetZeros(numZeros)) {
				checkProof = true;
			}
			else {
				newProof += 1;
			}


		} while (checkProof === false);

		const endTime = new Date().getTime();
		console.log(`Blook time was ${endTime - startTime} ms`);
		return newProof;

	}

	async mineBlock() {
		const prevProof =  this.getLatestBlock().getProof();
		const prevHash =  this.getLatestBlock().getHash();

		return await this.proofOfWork(prevProof);
	}

	/*
	 *
	 * */
	async add(data) {
		const proof = await this.mineBlock();
		const success = this.acceptBlock(
			this.blocks[this.blocks.length - 1].getHash(),
			data,
			proof,
		);
		return success;
	}

	// simulate trying to add a bad block
	add_BAD(data) {
		this.blocks.push(new Block('thisISaBADhashVALUE', data));
	}

	print() {
		console.log(`block hash\tprevious hash`);
		this.blocks.forEach(block => console.log(`${hash(JSON.stringify(block))}\t${block.previousHash}`))
		this.blocks.forEach(block => console.table({block, proof: block.proof, prevHash: block.getPrevHash(), data: block.data, }));
	}
}
























