import Chain from './Chain.js';

export default class Miner {
	constructor (data, chain) {
		this.data = data;
		this.chain = chain;
	}

	async saveToChain(delay = 0) {
		while (! await this.chain.add(this.data)) {

			if (delay > 0)
				await new Promise(r => setTimeout(r, delay));
		};
	}
}

