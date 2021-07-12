import Chain from './Chain.js';
import { hash } from './hash.js'
import Block from './Block.js';
import { HARDNESS, GetZeros } from './Settings.js';

export default class Miner {
	constructor (data, chain) {
		this.data = data;
		this.chain = chain;
	}

	async proofOfWork (prevProof) {
		const startTime = new Date().getTime();

		for (let newProof = Math.floor(Math.random() * 100000 ) ; prevProof === this.chain.getLatestBlock().getProof() ; newProof++){
			const hashOp = hash((Math.pow(newProof, 2) - Math.pow(prevProof.solution, 2)).toString(16));

			if (hashOp.substring(0, HARDNESS) === GetZeros(HARDNESS)) {
				console.log(`Blook time was ${new Date().getTime() - startTime} ms`);
				return {solution: newProof, full: hashOp};
			}
		}
		return false;
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

					if (theProof === false) {
						console.log('bad proof -- out of sync with chain');
						await this.saveToChain();
					}
					
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

