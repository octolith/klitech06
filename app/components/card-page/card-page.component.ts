import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Card } from "../../models/card.type";
import { CardService } from "../../services/card.service";
import { SearchResult } from "../../models/search-result.type";
import { CompanyService } from "../../services/company.service";
import { Company } from "../../models/company.type";
import * as _ from "lodash";

@Component({
    selector: "card-page",
    templateUrl: "./card-page.component.html"
})
export class CardPageComponent implements OnInit {
    constructor(private cardService: CardService,
        private companyService: CompanyService) { }
    ngOnInit() {
        this.getCards();
        this.companyService.getCompanies().subscribe(cmp => this.companies = cmp);
    }
    companies: Company[];
    getCompanyName(id: number) {
        let company = _.find(this.companies || [], c => c.id == id);
        return company && company.name;
    }
    getCards() {
        this.cards = this.cardService.getCards();
    }
    cards: Observable<SearchResult<Card>>;
    selectedCard: Card;
}