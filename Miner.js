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
		return (proofOrFail === false) ? false:proofOrFail;
	}

	async proofOfWork (prevProof) {
		const startTime = new Date().getTime();

		for (let newProof = Math.floor(Math.random() * 100000 ) ; ; newProof++){
			const hashOp = hash((Math.pow(newProof, 2) - Math.pow(prevProof.solution, 2)).toString(16));

			if (hashOp.substring(0, HARDNESS) === GetZeros(HARDNESS)) {
				const endTime = new Date().getTime();
				console.log(`Blook time was ${endTime - startTime} ms`);
				return {solution: newProof, full: hashOp};
			}
			if (prevProof !== this.chain.getLatestBlock().getProof() ){
				console.log(`\tto late.....`);
				return false;
			}
		}
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

