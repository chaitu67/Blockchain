//Initiate an instance of the smart contract
Boo.deployed().then(function(i){token=i;})
//Intiate an instance if a particular function in smart contract
token.totalSupply().then(function(s){totalSupply=s;})
//Call function and get the value as number
totalSupply.toNumber()