const _common = require('@ethereumjs/common');
const { Chain, Hardfork, default: Common } = _common
const { FeeMarketEIP1559Transaction } = require('@ethereumjs/tx')

const common = new Common({ chain: Chain.Rinkeby, hardfork: Hardfork.London })

const privateKey = '027b7260566eba7fd7f046e0b56b62c8a2f52b9d9fb32aa9e649bb93c0b181b5'
const pkb = Buffer.from(privateKey, 'hex')

const txDataDec = {
  "from": "0x0e51a6626f7682f298960fd5eee766b24b232b72",
  "gasLimit": "0x5208",
  "nonce": "0x0",
  "to": "0xe18035bf8712672935fdb4e5e431b1a0183d2dfc",
  "value": "0x0",
  "maxFeePerGas": 123456789,
  "maxPriorityFeePerGas": 55555,
  "chainId": "0x4",
  "accessList": []
}

const txDataHex = {
  "from": "0x0e51a6626f7682f298960fd5eee766b24b232b72",
  "gasLimit": "0x5208",
  "nonce": "0x0",
  "to": "0xe18035bf8712672935fdb4e5e431b1a0183d2dfc",
  "value": "0x0",
  "maxFeePerGas": '0x' + txDataDec.maxFeePerGas.toString(16),
  "maxPriorityFeePerGas": '0x0' + txDataDec.maxPriorityFeePerGas.toString(16),
  "chainId": "0x4",
  "accessList": []
}
console.log('txDataHex', txDataHex)
const bufferToHex = function (buf) {
    return '0x' + buf.toString('hex');
};

const txFromHex = FeeMarketEIP1559Transaction.fromTxData(txDataHex, { common })
const txFromDec = FeeMarketEIP1559Transaction.fromTxData(txDataDec, { common })

const signedFromHex = txFromHex.sign(pkb)
const signedFromDec = txFromDec.sign(pkb)

console.log('signedFromHex', signedFromHex.serialize().toString('hex'))
console.log('signedFromDec', signedFromDec.serialize().toString('hex'))
console.log(signedFromDec.serialize().toString('hex') === signedFromHex.serialize().toString('hex'))