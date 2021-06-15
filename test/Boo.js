var boo=artifacts.require("./Boo.sol");

contract('boo',function(accounts) {
	var tokenInstance;

	it('initate the contract with correct values',function(){
		return boo.deployed().then(function (instance){
			tokenInstance=instance;
			return tokenInstance.name(); 
	}).then(function(name){
		assert.equal(name,'Boo Token','Has the correct name');
		return tokenInstance.symbol();
	}).then(function(symbol){
		assert.equal(symbol,'Boo','Has the correct symbol');
		return tokenInstance.standard();
	}).then(function(standard){
		assert.equal(standard,'Boo Token v1.0','Has the correct standard');
		return tokenInstance.standard();
	})

})
	it('Allocate intial supply on deployment',function(){
		return boo.deployed().then(function (instance){
			tokenInstance=instance;
			return tokenInstance.totalSupply(); 
	}).then(function(totalSupply){
		assert.equal(totalSupply.toNumber(),1000000,'Set total supply to 1000000');
		return tokenInstance.balanceOf(accounts[0]);
	}).then(function(adminbalance){
		assert.equal(adminbalance.toNumber(),1000000,'Allocate intial supply to admin account ');
	});

});


	it('transfers token ownership',function(){
		return boo.deployed().then(function (instance){
			tokenInstance=instance;
			//test require statement by sending amount larger that sender's balance
			return tokenInstance.transfer.call(accounts[1],999999999999999999999);
		}).then(assert.fail).catch(function(error){
			assert(error.message,'error message must contain revert');
			//assert(error.message.indexOf('revert')>=0,'error message must contain revert');
			return tokenInstance.transfer(accounts[1],250000,{ from : accounts[0]});
		}).then(function(receipt) {
			assert.equal(receipt.logs.length,1,'triggers one event');
			assert.equal(receipt.logs[0].event,'Transfer','should be the Transfer event');
			assert.equal(receipt.logs[0].args._from,accounts[0],'Sender account details');
			assert.equal(receipt.logs[0].args._to,accounts[1],'receiver account details');
			assert.equal(receipt.logs[0].args._value,250000,'account transfered');
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance){
			assert.equal(balance.toNumber(),250000,'adds the amount to the receving account');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance){
			assert.equal(balance.toNumber(),750000,'deducts the amount from the edning account');
		})
	});
});