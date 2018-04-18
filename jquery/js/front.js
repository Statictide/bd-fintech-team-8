$(document).ready(function() {
    front.init();
});

var front = (function(){
	"use strict";

	var accounts = [];

	var _init = function(){
		console.log("it's alive!");
		updateAccounts();
	};

	//fetch accounts and append them in UI with link to transactions.html
	var updateAccounts = function(){
		service.fetchAccounts(function(response){
			accounts = response.accounts;
			for(var i = 0; i < accounts.length; i++){
				$(".accounts").append("<li class='account'>"
							+ "<a href='transactions.html?account=" + accounts[i].account_nbr + "'>"
							+ "<div class='name'>" + accounts[i].name + "</div>"
							+ "<div class='number'>" + accounts[i].account_nbr + "</div>"
							+ "<div class='balance'>" + accounts[i].balance + " kr</div>"
							+ "</a>"
							+ "</li>"
				);
			}
		});
	};

	//public functions
	return {
		init : _init
	}
})();