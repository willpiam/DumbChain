import { hash } from './hash.js'

export default class Block {

	constructor(previousHash, data, proof) {
		this.previousHash = previousHash;
		this.data = data;
		this.proof = proof;

		console.log(`\tNew Block!! ${JSON.stringify(this)}`);
	}

	getHash() {
		return hash(JSON.stringify(this));
	}

	getData() {
		return this.data;
	}

	getProof() {
		return this.proof;
	}

	getPrevHash() {
		return this.previousHash;
	}
}
