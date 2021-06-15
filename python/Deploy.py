
import json
from web3 import Web3, HTTPProvider
from web3.contract import ConciseContract

# web3.py instance
w3 = Web3(HTTPProvider("HTTP://127.0.0.1:7545"))
print(w3.isConnected())

key="fb2d8e0397940e9a1e2ba3ee91f42c1f6e36a820743c9380961db6ec1d5c4390"
acct = w3.eth.account.privateKeyToAccount(key)

# compile your smart contract with truffle first
truffleFile = json.load(open('/Users/chaitanyavarmamudundi/Desktop/Json_to_block/build/contracts/database.json'))
abi = truffleFile['abi']
bytecode = truffleFile['bytecode']
contract= w3.eth.contract(bytecode=bytecode, abi=abi)

#building transaction
construct_txn = contract.constructor().buildTransaction({
    'from': acct.address,
    'nonce': w3.eth.getTransactionCount(acct.address),
    'gas': 1728712,
    'gasPrice': w3.toWei('21', 'gwei')})

signed = acct.signTransaction(construct_txn)

tx_hash=w3.eth.sendRawTransaction(signed.rawTransaction)
print(tx_hash.hex())
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
print("Contract Deployed At:", tx_receipt['contractAddress'])