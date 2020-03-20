import { QueryList } from "@angular/core";
import { ColDef } from "@ag-grid-community/core";
export declare class AgGridColumn {
    childColumns: QueryList<AgGridColumn>;
    hasChildColumns(): boolean;
    toColDef(): ColDef;
    private getChildColDefs;
    private createColDefFromGridColumn;
    children: any;
    sortingOrder: any;
    allowedAggFuncs: any;
    menuTabs: any;
    cellClassRules: any;
    icons: any;
    headerGroupComponent: any;
    headerGroupComponentFramework: any;
    headerGroupComponentParams: any;
    cellStyle: any;
    cellRendererParams: any;
    cellEditorFramework: any;
    cellEditorParams: any;
    pinnedRowCellRendererFramework: any;
    pinnedRowCellRendererParams: any;
    filterFramework: any;
    filterParams: any;
    headerComponent: any;
    headerComponentFramework: any;
    headerComponentParams: any;
    floatingFilterComponent: any;
    floatingFilterComponentParams: any;
    floatingFilterComponentFramework: any;
    tooltipComponent: any;
    tooltipComponentParams: any;
    tooltipComponentFramework: any;
    refData: any;
    headerName: any;
    columnGroupShow: any;
    headerClass: any;
    toolPanelClass: any;
    headerValueGetter: any;
    groupId: any;
    colId: any;
    sort: any;
    field: any;
    type: any;
    tooltipField: any;
    headerTooltip: any;
    cellClass: any;
    showRowGroup: any;
    filter: any;
    aggFunc: any;
    cellRenderer: any;
    cellEditor: any;
    pinned: any;
    chartDataType: any;
    sortedAt: any;
    flex: any;
    width: any;
    minWidth: any;
    maxWidth: any;
    rowGroupIndex: any;
    pivotIndex: any;
    dndSourceOnRowDrag: any;
    valueGetter: any;
    valueSetter: any;
    filterValueGetter: any;
    keyCreator: any;
    cellRendererFramework: any;
    pinnedRowCellRenderer: any;
    valueFormatter: any;
    pinnedRowValueFormatter: any;
    valueParser: any;
    comparator: any;
    equals: any;
    pivotComparator: any;
    suppressKeyboardEvent: any;
    colSpan: any;
    rowSpan: any;
    getQuickFilterText: any;
    newValueHandler: any;
    onCellValueChanged: any;
    onCellClicked: any;
    onCellDoubleClicked: any;
    onCellContextMenu: any;
    rowDragText: any;
    tooltip: any;
    tooltipValueGetter: any;
    cellRendererSelector: any;
    cellEditorSelector: any;
    suppressCellFlash: any;
    suppressColumnsToolPanel: any;
    suppressFiltersToolPanel: any;
    openByDefault: any;
    marryChildren: any;
    hide: any;
    rowGroup: any;
    pivot: any;
    checkboxSelection: any;
    headerCheckboxSelection: any;
    headerCheckboxSelectionFilteredOnly: any;
    suppressMenu: any;
    suppressSorting: any;
    suppressMovable: any;
    suppressFilter: any;
    lockPosition: any;
    lockVisible: any;
    lockPinned: any;
    unSortIcon: any;
    suppressSizeToFit: any;
    suppressResize: any;
    suppressAutoSize: any;
    enableRowGroup: any;
    enablePivot: any;
    enableValue: any;
    editable: any;
    suppressPaste: any;
    suppressNavigable: any;
    enableCellChangeFlash: any;
    rowDrag: any;
    dndSource: any;
    autoHeight: any;
    sortable: any;
    resizable: any;
    singleClickEdit: any;
}
