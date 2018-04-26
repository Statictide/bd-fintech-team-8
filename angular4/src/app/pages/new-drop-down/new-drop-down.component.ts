import { Component, OnInit } from '@angular/core';
import { Service } from '../../../services/service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-drop-down',
  templateUrl: './new-drop-down.component.html',
  styleUrls: ['./new-drop-down.component.css']
})
export class NewDropDownComponent implements OnInit {
  private accounts = [];
  private info = [];
  private transactions = [];
  private selectedAccount;
  private account;
  private categori;
  private paramsSubscription;
  constructor(private service: Service,  private route: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.service.fetchAccounts().then(
      data => {
          this.accountDataReady(data);
      }
    );

  }

  private accountDataReady(data){
    this.accounts = data.accounts;
    this.paramsSubscription = this.route.params.subscribe(
         params => {
           for(let account of this.accounts){
            console.log("FOR" + account.account_nbr === params['id']);
            console.log("ID:" + params['id'] );
                 if(account.account_nbr === "7454-7548228"){
                     this.selectAccount(account);
                     break;
                 }
             }
         }
     );
 }

 private selectAccount(account){
  this.selectedAccount = account;
  this.categori = 0;
  //this.selectedAccount.balance = this.accounts[0].balance;
  this.fetchTransactionData(this.selectedAccount, this.categori);
}

private fetchTransactionData(account, page){
  console.log("HEREH");
  this.service.fetchTransactionsByPage(account.account_nbr, page)
  .then(data => {
      console.log("BEFORE" + JSON.stringify(data));
      this.transactions = data['transactions'];
  })

}

private sendMessage(){

  console.log("TRANS:" + this.transactions);
  this.transactions.forEach(element => {
    console.log("CATEGORI" + element.trx_category);
    
    this.info.push(element.trx_category);
  });

  /*
  this.account ="Opsparingskonto ";
  this.categori = "Ingen kategori ";
  this.service.fetchTransactionsByCat(this.account,this.categori)
  .then(data => {
    this.info = data['transactions'];
    console.log(JSON.stringify(data));
})
*/
}


}
