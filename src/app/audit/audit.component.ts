import { UserService } from '@/_services';
import { Component, OnInit } from '@angular/core';
export interface Options {
    size: number,
    page: number;
}
@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit {

    users: any[] = [];
    datasource: any[] = [];
    options: Options = {
        page: 1,
        size: 5,
    };
    skip: number = 0

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.getUsers()
    }

    getUsers(skip = 0, limit = 5) {
        this.userService.getAllAudits(skip, limit)
            .subscribe((users: any) => {
                this.users = users;
            })
    }

    getSkipValue() {
        this.skip = Number((this.options.page - 1) * this.options.size)
        return this.skip
    }

    next() {
        this.options.page++;
        this.getUsers(this.getSkipValue(), this.options.size)
    }

    prev() {
        this.options.page--;
        if (this.options.page > 0) {

            this.getUsers(this.getSkipValue(), this.options.size)

        } else {
            this.options.page = 0
        }

    }

}