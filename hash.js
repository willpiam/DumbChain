//const crypto = require('crypto');
import crypto from 'crypto';

export function hash(valueToHash) {
	return crypto.createHash('sha1').update(valueToHash).digest('hex');
}
