const { base58 } = require('micro-base');
// A simple decoder for SS58 Address formats used across Substrate based chains
// @todo implement validation
// @todo implement encoder
// @todo update to typescript


function decodeSS58(address) {
  const decoded = base58.decode(address);
  const ss58Length = decoded[0] & 0b0100_0000 ? 2 : 1;

  const networkId = ss58Length === 1
    // one byte address prefix
    ? decoded[0]
    // two byte address prefix
    : (decoded[0] & 0b0011_1111) << 2 | (decoded[1] >> 6) | ((decoded[1] & 0b0011_1111) << 8);

  const isPublicKey = [34 + ss58Length, 35 + ss58Length].includes(decoded.length);
  const length = decoded.length - (isPublicKey ? 2 : 1);

  const publicKey = decoded.slice(ss58Length, length);

  return {
    ss58Length, networkId, length, publicKey
  }
};

module.exports = { decodeSS58 }