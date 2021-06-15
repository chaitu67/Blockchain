pragma solidity ^ 0.5.16;

contract Boo {
	//Constructor
	//Set total number of tokens
	//Read total number of tokens

	//Name of token
	string public name="Boo Token";
	//Symbol
	string public symbol="Boo";
	//Standard
	string public standard="Boo Token v1.0";
	//Set total Supply of tokens
	uint256 public totalSupply;

	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value
	);

	mapping(address => uint256) public balanceOf;


	constructor(uint256 _initialSupply) public{
		//allocate intial supply
		balanceOf[msg.sender]=_initialSupply;
		//Displaying total supply
		totalSupply=_initialSupply;
	}

	//Transfer function

	function transfer(address _to,uint256 _value) public returns (bool success){
	//throw exception if account doesnt have enough tokens

	require(balanceOf[msg.sender] >= _value);
	balanceOf[msg.sender]-=_value;
	balanceOf[_to]+=_value;
	//trigger transfer event

	emit Transfer(msg.sender,_to,_value);

	//return bool

	return true;
		
	}
}