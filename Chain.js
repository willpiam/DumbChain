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

	async acceptBlock(prvHsh, data, proof) {

		if (prvHsh === this.getLatestBlock().getHash()) {

			// This block has (probably) not yet been blocked

			// check proof
			async function checkProof (_proof) {

				// 1. do proof
				// 2. check our proof against their proof
				// 3. a) if their's matches ours then it is correct. 
				return true;

				// 3. b) otherwise
				return false;

			}

			if (await checkProof(proof)) {

				// proof matches ours 

				// LOCK THE ARRAY
				/*?how?*/


				// check that this prvHsh still matches hash of most recent block
				if (prvHsh == this.getLatestBlock().getHash()) {
					this.blocks.push(new Block(prvHsh, data, proof));
					// return true to indicate success to caller
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
























