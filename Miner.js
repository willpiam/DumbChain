import Chain from './Chain.js';
import { hash } from './hash.js'
import Block from './Block.js';
import { HARDNESS, GetZeros } from './Settings.js';

export default class Miner {
	constructor (data, chain) {
		this.data = data;
		this.chain = chain;
	}

	async mineBlock() {
		const prevProof =  this.chain.getLatestBlock().getProof();
		const proofOrFail = await this.proofOfWork(prevProof);
		return (typeof proofOrFail === 'string') ? false:proofOrFail;
	}

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
			else 
				newProof += 1;

			if (prevProof !== this.chain.getLatestBlock().getProof() ){
				console.log(`\tto late.....`);
				return "block already mined";
			}

		} while (checkProof === false);

		const endTime = new Date().getTime();
		console.log(`Blook time was ${endTime - startTime} ms`);
		return {solution: newProof, full: full} ;
	}



	async saveToChain(delay = 0) {

		switch ('b'){ 
			case 'a':
				{
					const theProof = await Promise.race([
						this.proofOfWork(this.chain.getLatestBlock().getProof()),
						this.proofOfWork(this.chain.getLatestBlock().getProof()),
					]);
					if (! this.chain.add(this.data, theProof))
						await this.saveToChain();
					break;
				}
			case 'b': 
				{
					const theProof = await this.proofOfWork(this.chain.getLatestBlock().getProof());
					if (! this.chain.add(this.data, theProof))
						await this.saveToChain();
					break;
				}
			default:
				console.log(`unknown option`);
				break;
		}
	}
}

