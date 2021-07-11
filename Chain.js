import { hash } from './hash.js'
import Block from './Block.js';
import { HARDNESS, GetZeros } from './Settings.js';


export default class Chain {

	constructor(genesisHash) {
		this.blocks = [new Block(genesisHash, {val: 'banks suck'}, {solution: 128, full: 821})];
	}

	getLatestBlock() {
		return this.blocks[this.blocks.length - 1];
	}

	async checkProof (_proof) {

		async function ProperApproch (_this, _proof) {
			const hashOp = hash((Math.pow(_proof.solution, 2) - Math.pow(_this.getLatestBlock().getProof().solution, 2)).toString(16));

			if (hashOp.substring(0, HARDNESS) === GetZeros(HARDNESS))
				return true;

			console.log(`proof bad`);
			return false;
		}

		//return await NaiveApproch(this, _proof.solution);
		return await ProperApproch(this, _proof);
	}

	async acceptBlock(prvHsh, data, proof) {

		if (prvHsh === this.getLatestBlock().getHash()) {
			// This block has (probably) not yet been blocked

			if (await this.checkProof(proof)) {

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
	async proofOfWork (prevProof) {
		const startTime = new Date().getTime();

		const COEFF = Math.random() * 0.5 ;

		let newProof = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER * COEFF) );
		let checkProof = false;
		let full = '';

		do {
			const hashOp = hash((Math.pow(newProof, 2) - Math.pow(prevProof.solution, 2)).toString(16));

			if (hashOp.substring(0, HARDNESS) === GetZeros(HARDNESS)) {
				full = hashOp;
				checkProof = true;
				break;
			}
			else {
				newProof += 1;
			}

			if (prevProof !== this.getLatestBlock().getProof() ){
				console.log(`\tto late.....`);
				return "block already mined";
			}



		} while (checkProof === false);

	//	console.log('proof found');

		const endTime = new Date().getTime();
		console.log(`Blook time was ${endTime - startTime} ms`);
		return {solution: newProof, full: full} ;
	}
	*/
/*	async mineBlock() {
		const prevProof =  this.getLatestBlock().getProof();
		const proofOrFail = await this.proofOfWork(prevProof);
		return (typeof proofOrFail === 'string') ? false:proofOrFail;
	}
	*/
	/*
	 *
	 * */
	async add(data, proof) {
		//const proof = await this.mineBlock();
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

	// simulate trying to add a bad block
	add_BAD(data) {
		this.blocks.push(new Block('thisISaBADhashVALUE', data));
	}

	print() {
		console.log(`CHAIN \nblock hash\tprevious hash`);
		this.blocks.forEach(block => console.log(`${hash(JSON.stringify(block))}\t${block.previousHash}\t${JSON.stringify(block.data)}`))
	}
}
























