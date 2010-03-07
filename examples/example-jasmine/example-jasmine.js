Account = function() {
	
	this.balance = 0;
	
	this.getDetails = {
		'accountName' : function() {
			return 'Account Name';
		}
	}
	
	this.checkBalance = function() {
		return this.balance;
	};
	
	this.subtract = function(amount) {
		this.balance = this.balance - amount;
	};
	
}

Banker = function() {
	
	this.account = new Account();
	
	this.withdraw = function(amount) {
		var balance = this.account.checkBalance();
		
		if (balance == 0) {
			throw('There was no money in the bank account');
		} else {
			this.account.subtract(amount);
			jQuery('#status')[0].value = 'Subtracted ' + amount + ' from the account!';
			jQuery('#status').show();
		}
	};
	
	this.accountName = function() {
		return this.account.getDetails.accountName();
	};
}