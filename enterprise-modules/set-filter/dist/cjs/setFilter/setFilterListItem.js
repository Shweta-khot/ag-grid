"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@ag-grid-community/core");
var SetFilterListItem = /** @class */ (function (_super) {
    __extends(SetFilterListItem, _super);
    function SetFilterListItem(value, column) {
        var _this = _super.call(this, SetFilterListItem.TEMPLATE) || this;
        _this.selected = true;
        _this.value = value;
        _this.column = column;
        return _this;
    }
    SetFilterListItem.prototype.useCellRenderer = function (target, eTarget, params) {
        var cellRendererPromise = this.userComponentFactory.newCellRenderer(target.filterParams, params);
        if (cellRendererPromise != null) {
            core_1._.bindCellRendererToHtmlElement(cellRendererPromise, eTarget);
        }
        else {
            if (params.valueFormatted == null && params.value == null) {
                var localeTextFunc = this.gridOptionsWrapper.getLocaleTextFunc();
                eTarget.innerText = '(' + localeTextFunc('blanks', 'Blanks') + ')';
            }
            else {
                eTarget.innerText = params.valueFormatted != null ? params.valueFormatted : params.value;
            }
        }
        return cellRendererPromise;
    };
    SetFilterListItem.prototype.init = function () {
        var _this = this;
        this.render();
        this.eCheckbox.onValueChange(function (value) {
            _this.selected = value;
            var event = {
                type: SetFilterListItem.EVENT_SELECTED
            };
            return _this.dispatchEvent(event);
        });
    };
    SetFilterListItem.prototype.isSelected = function () {
        return this.selected;
    };
    SetFilterListItem.prototype.setSelected = function (selected) {
        this.selected = selected;
        this.updateCheckboxIcon();
    };
    SetFilterListItem.prototype.updateCheckboxIcon = function () {
        this.eCheckbox.setValue(this.isSelected(), true);
    };
    SetFilterListItem.prototype.render = function () {
        var _this = this;
        var valueElement = this.queryForHtmlElement('.ag-set-filter-item-value');
        var colDef = this.column.getColDef();
        var filterValueFormatter = this.getFilterValueFormatter(colDef);
        var valueFormatted = this.valueFormatterService.formatValue(this.column, null, null, this.value, filterValueFormatter);
        var params = {
            value: this.value,
            valueFormatted: valueFormatted,
            api: this.gridOptionsWrapper.getApi()
        };
        var componentPromise = this.useCellRenderer(colDef, valueElement, params);
        if (!componentPromise) {
            return;
        }
        componentPromise.then(function (component) {
            if (component && component.destroy) {
                _this.addDestroyFunc(component.destroy.bind(component));
            }
        });
    };
    SetFilterListItem.prototype.getFilterValueFormatter = function (colDef) {
        return colDef.filterParams ? colDef.filterParams.valueFormatter : undefined;
    };
    SetFilterListItem.EVENT_SELECTED = 'selected';
    SetFilterListItem.TEMPLATE = "<label class=\"ag-set-filter-item\">\n            <ag-checkbox ref=\"eCheckbox\" class=\"ag-set-filter-item-checkbox\"></ag-checkbox>\n            <span class=\"ag-set-filter-item-value\"></span>\n        </label>";
    __decorate([
        core_1.Autowired('gridOptionsWrapper')
    ], SetFilterListItem.prototype, "gridOptionsWrapper", void 0);
    __decorate([
        core_1.Autowired('valueFormatterService')
    ], SetFilterListItem.prototype, "valueFormatterService", void 0);
    __decorate([
        core_1.Autowired('userComponentFactory')
    ], SetFilterListItem.prototype, "userComponentFactory", void 0);
    __decorate([
        core_1.RefSelector('eCheckbox')
    ], SetFilterListItem.prototype, "eCheckbox", void 0);
    __decorate([
        core_1.PostConstruct
    ], SetFilterListItem.prototype, "init", null);
    return SetFilterListItem;
}(core_1.Component));
exports.SetFilterListItem = SetFilterListItem;
//# sourceMappingURL=setFilterListItem.js.map