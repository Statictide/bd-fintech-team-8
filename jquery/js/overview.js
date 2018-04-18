$(document).ready(function() {
    overview.init();
});

var overview = (function(){
	"use strict";

	var accounts = [];
	var accountNames = [];
	var accountBalances = [];
	var transactions = [];

	var _init = function(){
		refreshCurrentBalanceChart();
		bindListeners();
	};

	var findTransactionsWithMinAmount = function(transactions, min){
		var newTransactions = [];
		for(var i = 0; i < transactions.length; i++){
			if(transactions[i].trx_ammount < min){
				newTransactions.push(transactions[i]);
			}
		}
		return newTransactions;
	};

	//make buttons and stuff clicky
	var bindListeners = function(){
		$("#refresh-balance-chart").on("click", refreshCurrentBalanceChart);
		$("#refresh-amount-stats").on("click", refreshAmountStats);
	};

	//fetch accounts and create chart
	var refreshCurrentBalanceChart = function(){
		service.fetchAccounts(function(response){
			accounts = response.accounts;
			setAccountData();
			setupCurrentBalanceChart();
		});
	};

	//fetch transactions and find ones with min amount
	var refreshAmountStats = function(){
		var year = $("#amount-stats-year").val();
		service.fetchTransactionsByDate(accounts[0].account_nbr, year + "-01-01", year + "-12-31", function(response){
			transactions = findTransactionsWithMinAmount(response.transactions, $("#amount-stats-min").val());
			$(".amount-stats-transactions").empty();
			$(".amount-stats-transactions").append("<ul class='transactions'></ul>");
			for(var i = 0; i < transactions.length; i++){
				$(".transactions").append("<li>" + transactions[i].trx_time + " " + transactions[i].trx_description + " " + transactions[i].trx_ammount + "</li>")
			}
		});
	};

	//build some account data arrays
	var setAccountData = function(){
		for(var i = 0; i < accounts.length - 1; i++){
			accountNames.push(accounts[i].name);
			accountBalances.push(accounts[i].balance);
		}
	};

	//make a pretty bar chart
	var setupCurrentBalanceChart = function(){
		$('#container').highcharts({
	        credits: {
	        	enabled : false
	        },
	        legend: {
	        	enabled : false
	        },
	        chart: {
	            type: 'column',
	            width: 500
	        },
	        title: {
	            text: 'Saldo lige nu'
	        },
	        xAxis: {
	            categories: accountNames
	        },
	        yAxis: {
				title: '',
				reversed: 'false'
	        },
	        tooltip: {
	            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	                '<td style="padding:0"><b>{point.y:.2f} USD</b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
	            useHTML: true
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        },
	        series: [{
				name: 'Saldo',
	            data: accountBalances
	        }]
        });
	};

	//public functions
	return {
		init : _init
	}
})();