import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Service {
    private readonly SERVER_URL = "http://54.171.10.37";
    private readonly SERVER_PORT = "18888";
    

	private readonly ACCOUNT_SERVICE_URL = this.SERVER_URL + ":" + this.SERVER_PORT + "/accounts";
	private readonly TRANSACTIONS_SERVICE_URL = this.SERVER_URL + ":" + this.SERVER_PORT + "/transactions";
    private readonly CATEGORIES_SERVICE_URL = this.SERVER_URL + ":" + this.SERVER_PORT + "/categories";
    private readonly BANK_ROBOT_URL = this.SERVER_URL + ":" + this.SERVER_PORT + "/bankbot";
    private readonly BANK_SECRET_URL = this.SERVER_URL + ":" + this.SERVER_PORT + "/secret";
  
    constructor(private http: HttpClient) { }

	//fetches all accounts
    public fetchAccounts() {
        return this.http.get(this.ACCOUNT_SERVICE_URL)
            .toPromise()
            .catch(error => {
                console.debug('Error fetching accounts: ' + error.message);
            });
    }

    //fetches a page of transactions for a given account
	//accNbr format: "7454-3742221"
    public fetchTransactionsByPage(accNbr, page){
        return this.http.get(this.TRANSACTIONS_SERVICE_URL + "?arg1=fetchByPage&arg2=" + accNbr + "&arg3=" + page)
            .toPromise()
            .catch(error => {
                console.debug('Error fetching transactions by page: ' + error.message);
            });
    }

    //fetches transactions in date interval for a given account
	//accNbr format: "7454-3742221"
	//date format: "2016-03-21" 
	public fetchTransactionsByDate(accNbr, fromDate, toDate){
        return this.http.get(this.TRANSACTIONS_SERVICE_URL + "?arg1=fetchByDate&arg2=" + accNbr + "&arg3=" + fromDate + "&arg4=" + toDate)
            .toPromise()
            .catch(error => {
                console.debug('Error fetching transactions by date: ' + error.message);
            });        
    }

    public fetchTransactionsByCat(accNbr, cat){
        return this.http.get(this.TRANSACTIONS_SERVICE_URL + "?arg1=fetchByCat&arg2=" + accNbr + "&arg3=" +cat)
            .toPromise()
            .catch(error => {
                console.debug('Error fetching transactions by date: ' + error.message);
            });        
    }

    

    //fetches list of all categories with sub-categories
    public fetchCategories(){
        return this.http.get(this.CATEGORIES_SERVICE_URL)
            .toPromise()
            .catch(error => {
                console.debug('Error fetching categories: ' + error.message);
            })
    }

    //fetches a list of keywords and their probabilities of a match
    public fetchBotIntent(message){
		return this.http.get(this.BANK_ROBOT_URL + "?msg=" + message)
            .toPromise()
            .catch(error => {
                console.debug('Error fetching fetching classified message: ' + error.message);
            });
    };

    //very secret
    public secret(){
        return this.http.get(this.BANK_SECRET_URL)
            .toPromise()
            .catch(error => {
                console.debug('Error fetching secret: ' + error.message);
        });
    }
}