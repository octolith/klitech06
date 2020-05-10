import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Card } from "../../models/card.type";
import { CardService } from "../../services/card.service";
import { SearchResult } from "../../models/search-result.type";
import { CompanyService } from "../../services/company.service";
import { Company } from "../../models/company.type";
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { createScope } from "@angular/core/src/profile/wtf_impl";

@Component({
    selector: "company-page",
    templateUrl: "./company-page.component.html"
})
export class CompanyPageComponent implements OnInit {
    constructor(private companyService: CompanyService,
        private cardService: CardService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {        
        this.getAllCards();
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
    cards: Observable<Card[]>;
    companies: Observable<Company[]>;
    getAllCards() {
        this.cards = this.cardService.getCards().map(r => r.results);
        console.log(this.cards.subscribe(e => e[0].firstName));
    }
    getCards(id: number) {
        let companyCards = this.cards.subscribe(card => card.find(c => c.companyId = this.selectedCompany.id));
        return companyCards;
    }
    getCompanies() {
        this.companies = this.companyService.getCompanies();
        this.companies.subscribe();
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