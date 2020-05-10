import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Company } from "../../models/company.type";
import { CardService } from "../../services/card.service";
import { CompanyService } from "../../services/company.service";
import { ActivatedRoute } from "@angular/router";
import { SearchResult } from "../../models/search-result.type";
import { Card } from "../../models/card.type";
import * as _ from "lodash";

@Component({
    selector: "company-page",
    templateUrl: "./company-page.component.html"
})
export class CompanyPageComponent implements OnInit {
    constructor(private companyService: CompanyService,
        private cardService: CardService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.getCompanies();
        this.route.params.subscribe(params => {
            let companyId = +params['id'];
            this.companies.subscribe(cmps => {
                this.selectedCompany = cmps.find(cmp => cmp.id == companyId)
            });
        });
    }
    selectedCompany: Company;
    editing: boolean = false;
    cards: Card[];
    companies: Observable<Company[]>;
    getCompanies() {
        this.companies = this.companyService.getCompanies();
    }
    editCompany() {
        this.editing = true;
    }
    saveCompany(company: Company) {
        this.companyService.addOrUpdateCompany(company)
            .subscribe(() => {
                this.editing = false;
                this.getCompanies();
                this.selectedCompany = undefined;
            });
    }
}