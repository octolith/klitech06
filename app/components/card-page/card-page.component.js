"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var card_service_1 = require("../../services/card.service");
var company_service_1 = require("../../services/company.service");
var _ = require("lodash");
var CardPageComponent = (function () {
    function CardPageComponent(cardService, companyService) {
        this.cardService = cardService;
        this.companyService = companyService;
    }
    CardPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCards();
        this.companyService.getCompanies().subscribe(function (cmp) { return _this.companies = cmp; });
    };
    CardPageComponent.prototype.getCompanyName = function (id) {
        var company = _.find(this.companies || [], function (c) { return c.id == id; });
        return company && company.name;
    };
    CardPageComponent.prototype.getCards = function () {
        this.cards = this.cardService.getCards();
    };
    return CardPageComponent;
}());
CardPageComponent = __decorate([
    core_1.Component({
        selector: "card-page",
        templateUrl: "./card-page.component.html"
    }),
    __metadata("design:paramtypes", [card_service_1.CardService,
        company_service_1.CompanyService])
], CardPageComponent);
exports.CardPageComponent = CardPageComponent;
//# sourceMappingURL=card-page.component.js.map