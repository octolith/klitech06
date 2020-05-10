"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
        this.searchTerm = "";
        this.currentPage = 0;
        this.maxPages = 0;
        this.editing = false;
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
        var _this = this;
        this.cards = this.cardService.getCards({
            page: this.currentPage,
            searchTerm: this.searchTerm
        });
        this.cards.subscribe(function (r) {
            _this.maxPages = Math.ceil(r.allResults / 5);
            _this.currentPage = r.page;
        });
    };
    CardPageComponent.prototype.editCard = function () {
        this.editing = true;
        this.originalCard = this.selectedCard;
        this.selectedCard = __assign({}, this.originalCard); // make a copy of the object
    };
    CardPageComponent.prototype.saveCard = function (card) {
        var _this = this;
        this.cardService.addOrUpdateCard(card)
            .subscribe(function () {
            _this.editing = false;
            _this.getCards();
            _this.selectedCard = undefined;
            _this.originalCard = undefined;
        });
    };
    CardPageComponent.prototype.cancel = function () {
        this.editing = false;
        this.selectedCard = this.originalCard;
        this.originalCard = undefined;
    };
    CardPageComponent.prototype.confirmDelete = function () {
        var _this = this;
        if (confirm("Are you sure you want to delete card for \n        " + this.selectedCard.firstName + " " + this.selectedCard.lastName + "?")) {
            this.cardService.deleteCard(this.selectedCard.id).subscribe(function () {
                _this.editing = false;
                _this.getCards();
                _this.selectedCard = undefined;
                _this.originalCard = undefined;
            });
        }
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