import crypto from 'crypto';

/*	hash()
 *	Takes: 		Value To HASH
 *	Returns:	hash of value
 *	William Doyle
 *	Sometime before July 11th 2021
 * */
export function hash(valueToHash) {
	return crypto.createHash('sha1').update(valueToHash).digest('hex');
}
