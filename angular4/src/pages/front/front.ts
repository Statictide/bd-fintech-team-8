import { Component } from '@angular/core';
import { Service } from '../../services/service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './front.html'
})
export class Front {

    private accounts = [];

    constructor(
        private service: Service,
        private router: Router
    ) { }

    ngOnInit() { 
        this.service.fetchAccounts().then(
            data => {
                this.accounts = data['accounts'];
            }
        )
    }
}