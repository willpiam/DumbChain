const crypto = require('crypto');

class Block {

	constructor(previousHash, data) {
		this.previousHash = previousHash;
		this.data = data;
	}

	getHash() {
		return hash(JSON.stringify(this));
	}

	getData() {
		return this.data;
	}
}

class Chain {

	constructor(genesisHash) {
		this.blocks = [new Block(genesisHash, {})];
	}

	verify() {
		for (let i = 1; i < this.blocks.length; i++)
			if (this.blocks[i].previousHash !== this.blocks[i - 1].getHash())
				return false;
		return true;
	}

	add(data) {
		this.blocks.push(new Block(this.blocks[this.blocks.length - 1].getHash(), data));
	}

	// simulate trying to add a bad block
	add_BAD(data) {
		this.blocks.push(new Block('thisISaBADhashVALUE', data));
	}

	print() {
		console.log(`block hash\tprevious hash`);
		this.blocks.forEach(block => console.log(`${hash(JSON.stringify(block))}\t${block.previousHash}`))
	}
}

function hash(str) {
	return crypto.createHash('sha1').update(str).digest('hex');
}

function Main() {
	const genesisPhrase = "What is love?";
	const genesisHash = hash(genesisPhrase);
	console.log(`Genesis hash: ${genesisHash}`);

	// make chain
	const chain = new Chain(genesisHash);
	chain.add({ val: "WDD WAZ HERE" });
	chain.add({ val: "hellooooo" });
	chain.add({ val: "hellooooo" });
	chain.add({ val: "hellooooo" });
	chain.add({ val: "hellooooo" });
	chain.add({ val: "hellooooo" });
	chain.add({ val: "hellooooo" });
	chain.add({ val: "hellooooo" });

	chain.add_BAD({ val: "hellooooo" });

	chain.print();

	if (chain.verify())
		console.log('chain looks good');
	else
		console.log('chain has been tampered');
}

Main();