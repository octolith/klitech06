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
var router_1 = require("@angular/router");
var CompanyPageComponent = (function () {
    function CompanyPageComponent(companyService, cardService, route) {
        this.companyService = companyService;
        this.cardService = cardService;
        this.route = route;
        this.editing = false;
    }
    CompanyPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAllCards();
        this.getCompanies();
        this.route.params.subscribe(function (params) {
            var companyId = +params['id'];
            _this.companies.subscribe(function (cmps) {
                _this.selectedCompany = cmps.find(function (cmp) { return cmp.id == companyId; });
            });
        });
    };
    CompanyPageComponent.prototype.getAllCards = function () {
        this.cards = this.cardService.getCards().map(function (r) { return r.results; });
        console.log(this.cards.subscribe(function (e) { return e[0].firstName; }));
    };
    CompanyPageComponent.prototype.getCards = function (id) {
        var _this = this;
        var companyCards = this.cards.subscribe(function (card) { return card.find(function (c) { return c.companyId = _this.selectedCompany.id; }); });
        return companyCards;
    };
    CompanyPageComponent.prototype.getCompanies = function () {
        this.companies = this.companyService.getCompanies();
        this.companies.subscribe();
    };
    CompanyPageComponent.prototype.editCompany = function () {
        this.editing = true;
    };
    CompanyPageComponent.prototype.saveCompany = function (company) {
        var _this = this;
        this.companyService.addOrUpdateCompany(company)
            .subscribe(function () {
            _this.editing = false;
            _this.getCompanies();
            _this.selectedCompany = undefined;
        });
    };
    return CompanyPageComponent;
}());
CompanyPageComponent = __decorate([
    core_1.Component({
        selector: "company-page",
        templateUrl: "./company-page.component.html"
    }),
    __metadata("design:paramtypes", [company_service_1.CompanyService,
        card_service_1.CardService,
        router_1.ActivatedRoute])
], CompanyPageComponent);
exports.CompanyPageComponent = CompanyPageComponent;
//# sourceMappingURL=company-page.component.js.map