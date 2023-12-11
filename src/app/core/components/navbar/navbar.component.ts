import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit{

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        // this.account()
    }

    account() {
        this.api.account().subscribe(
            (res) => {
                console.log(res)
            }
        )
    }
}
