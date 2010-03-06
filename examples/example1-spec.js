var banker, account;

jQuery = mimic(jQuery);
account = mimic(new Account());
banker = new Banker();
inject(account).into(banker).as('account');

Screw.Unit(function() {
	describe('Banker', function() {
		describe('who is withdrawing money', function() {
			it('should check the balance of the account before subtracting', function() {
				when.	banker.withdraw(5000);
				then.	account.should('checkBalance');
			});
			
			it('should be allowed to do it successfully', function() {
				given.	account.should('checkBalance').andReturn(10000);
				when.	banker.withdraw(5000);
				then.	account.should('subtract').using(5000);
				and.	expect(jQuery('#status')[0].value).to(equal, 'Subtracted 5000 from the account!');
				and.	jQuery().usingSelector('#status').should('show');
			});
			
			it('should allow the account to be overdrawn even though there is not enough money in the account', function() {
				given.	account.should('checkBalance').andReturn(2000);
				when.	banker.withdraw(5000);
				then.	account.should('subtract').using(5000);
				and.	expect(jQuery('#status')[0].value).to(equal, 'Subtracted 5000 from the account!');
				and.	jQuery().usingSelector('#status').should('show');
			});
			
			it('should not be allowed as there is no money in the account', function() {
				given.	account.should('checkBalance').andReturn(0);
				and.	account.shouldNot('subtract');
				
				itShould.say('There was no money in the bank account');
				
				when.	banker.withdraw(5000);
				and.	jQuery().usingSelector('#status').neverHappens();
			});			
		});
		
		describe('who is finding out information about their account', function() {
			it('should provide the name of the account', function() {
				when.	banker.accountName();
				then.	account.should('getDetails.accountName');
			});
		});
	});
});