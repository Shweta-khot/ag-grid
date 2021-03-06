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
import { _, Autowired, Bean, BeanStub, ChartType, Optional, PreDestroy } from "@ag-grid-community/core";
import { GridChartComp } from "./chartComp/gridChartComp";
var ChartService = /** @class */ (function (_super) {
    __extends(ChartService, _super);
    function ChartService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // we destroy all charts bound to this grid when grid is destroyed. activeCharts contains all charts, including
        // those in developer provided containers.
        _this.activeCharts = new Set();
        _this.activeChartComps = new Set();
        return _this;
    }
    ChartService.prototype.getChartModels = function () {
        var models = [];
        this.activeChartComps.forEach(function (c) { return models.push(c.getChartModel()); });
        return models;
    };
    ChartService.prototype.createChartFromCurrentRange = function (chartType) {
        if (chartType === void 0) { chartType = ChartType.GroupedColumn; }
        var selectedRange = this.getSelectedRange();
        return this.createChart(selectedRange, chartType);
    };
    ChartService.prototype.createRangeChart = function (params) {
        var cellRange = this.rangeController
            ? this.rangeController.createCellRangeFromCellRangeParams(params.cellRange)
            : undefined;
        if (!cellRange) {
            console.warn("ag-Grid - unable to create chart as no range is selected");
            return;
        }
        return this.createChart(cellRange, params.chartType, params.chartThemeName, false, params.suppressChartRanges, params.chartContainer, params.aggFunc, params.chartThemeOverrides, params.unlinkChart, params.processChartOptions);
    };
    ChartService.prototype.createPivotChart = function (params) {
        // if required enter pivot mode
        if (!this.columnController.isPivotMode()) {
            this.columnController.setPivotMode(true, "pivotChart");
        }
        // pivot chart range contains all visible column without a row range to include all rows
        var chartAllRangeParams = {
            columns: this.columnController.getAllDisplayedColumns().map(function (col) { return col.getColId(); })
        };
        var cellRange = this.rangeController
            ? this.rangeController.createCellRangeFromCellRangeParams(chartAllRangeParams)
            : undefined;
        if (!cellRange) {
            console.warn("ag-Grid - unable to create chart as there are no columns in the grid.");
            return;
        }
        return this.createChart(cellRange, params.chartType, params.chartThemeName, true, true, params.chartContainer, undefined, params.chartThemeOverrides, params.unlinkChart, params.processChartOptions);
    };
    ChartService.prototype.createChart = function (cellRange, chartType, chartThemeName, pivotChart, suppressChartRanges, container, aggFunc, chartThemeOverrides, unlinkChart, processChartOptions) {
        var _this = this;
        if (pivotChart === void 0) { pivotChart = false; }
        if (suppressChartRanges === void 0) { suppressChartRanges = false; }
        if (unlinkChart === void 0) { unlinkChart = false; }
        var createChartContainerFunc = this.gridOptionsWrapper.getCreateChartContainerFunc();
        var params = {
            pivotChart: pivotChart,
            cellRange: cellRange,
            chartType: chartType,
            chartThemeName: chartThemeName,
            insideDialog: !(container || createChartContainerFunc),
            suppressChartRanges: suppressChartRanges,
            aggFunc: aggFunc,
            chartThemeOverrides: chartThemeOverrides,
            processChartOptions: processChartOptions,
            unlinkChart: unlinkChart
        };
        var chartComp = new GridChartComp(params);
        this.context.createBean(chartComp);
        var chartRef = this.createChartRef(chartComp);
        if (container) {
            // if container exists, means developer initiated chart create via API, so place in provided container
            container.appendChild(chartComp.getGui());
            // if the chart container was placed outside of an element that
            // has the grid's theme, we manually add the current theme to
            // make sure all styles for the chartMenu are rendered correctly
            var theme = this.environment.getTheme();
            if (theme.el && !theme.el.contains(container)) {
                _.addCssClass(container, theme.theme);
            }
        }
        else if (createChartContainerFunc) {
            // otherwise user created chart via grid UI, check if developer provides containers (eg if the application
            // is using its own dialogs rather than the grid provided dialogs)
            createChartContainerFunc(chartRef);
        }
        else {
            // add listener to remove from active charts list when charts are destroyed, e.g. closing chart dialog
            chartComp.addEventListener(GridChartComp.EVENT_DESTROYED, function () {
                _this.activeChartComps.delete(chartComp);
                _this.activeCharts.delete(chartRef);
            });
        }
        return chartRef;
    };
    ChartService.prototype.createChartRef = function (chartComp) {
        var _this = this;
        var chartRef = {
            destroyChart: function () {
                if (_this.activeCharts.has(chartRef)) {
                    _this.context.destroyBean(chartComp);
                    _this.activeChartComps.delete(chartComp);
                    _this.activeCharts.delete(chartRef);
                }
            },
            chartElement: chartComp.getGui(),
            chart: chartComp.getUnderlyingChart()
        };
        this.activeCharts.add(chartRef);
        this.activeChartComps.add(chartComp);
        return chartRef;
    };
    ChartService.prototype.getSelectedRange = function () {
        var ranges = this.rangeController.getCellRanges();
        return ranges.length > 0 ? ranges[0] : {};
    };
    ChartService.prototype.destroyAllActiveCharts = function () {
        this.activeCharts.forEach(function (chart) { return chart.destroyChart(); });
    };
    __decorate([
        Optional('rangeController')
    ], ChartService.prototype, "rangeController", void 0);
    __decorate([
        Autowired('columnController')
    ], ChartService.prototype, "columnController", void 0);
    __decorate([
        Autowired('environment')
    ], ChartService.prototype, "environment", void 0);
    __decorate([
        Autowired('gridOptionsWrapper')
    ], ChartService.prototype, "gridOptionsWrapper", void 0);
    __decorate([
        PreDestroy
    ], ChartService.prototype, "destroyAllActiveCharts", null);
    ChartService = __decorate([
        Bean('chartService')
    ], ChartService);
    return ChartService;
}(BeanStub));
export { ChartService };
