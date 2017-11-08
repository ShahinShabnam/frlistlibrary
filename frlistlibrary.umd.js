(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/Subject'), require('rxjs/add/operator/filter'), require('rxjs/add/operator/map'), require('devextreme-angular')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs/Subject', 'rxjs/add/operator/filter', 'rxjs/add/operator/map', 'devextreme-angular'], factory) :
	(factory((global.frlistlibrary = {}),global.core,global.common,global.Subject,null,null,global.devextremeAngular));
}(this, (function (exports,core,common,Subject,filter,map,devextremeAngular) { 'use strict';

var FrListLibraryComponent = (function () {
    function FrListLibraryComponent() {
    }
    return FrListLibraryComponent;
}());
FrListLibraryComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'sample-component',
                template: "<app-fr-select-list></app-fr-select-list>"
            },] },
];
/**
 * @nocollapse
 */
FrListLibraryComponent.ctorParameters = function () { return []; };

var FrSelectListService = (function () {
    function FrSelectListService() {
        this.listwidth = 500;
        this.dataForListCreate = []; //store date for list display
        this.subject = new Subject.Subject();
        this.listwidth = 20;
    }
    /**
     * @param {?} dataForListCreate
     * @param {?} columnForDisplay
     * @return {?}
     */
    FrSelectListService.prototype.getDataForListCreate = function (dataForListCreate, columnForDisplay) {
        this.dataForListCreate = dataForListCreate;
        console.log(this.dataForListCreate);
        this.columnForDisplay = columnForDisplay;
        console.log(this.columnForDisplay);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    FrSelectListService.prototype.filterOn = function (id) {
        return (this.subject.filter(function (d) { return (d.id === id); }));
    };
    
    /**
     * @param {?} id
     * @param {?=} options
     * @return {?}
     */
    FrSelectListService.prototype.emit = function (id, options) {
        this.subject.next({ id: id, data: options });
    };
    return FrSelectListService;
}());
FrSelectListService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
FrSelectListService.ctorParameters = function () { return []; };

var FrSelectListComponent = (function () {
    /**
     * @param {?} frSelectListService
     */
    function FrSelectListComponent(frSelectListService) {
        this.frSelectListService = frSelectListService;
    }
    /**
     * @return {?}
     */
    FrSelectListComponent.prototype.ngOnInit = function () {
        this.currentRow = 0;
    };
    /**
     * @param {?} key
     * @param {?} preserve
     * @return {?}
     */
    FrSelectListComponent.prototype.selectSingleRow = function (key, preserve) {
        if (!this.dataGrid.instance.isRowSelected(key)) {
            this.dataGrid.instance.selectRows([key], preserve);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    FrSelectListComponent.prototype.onContentReadyHandler = function (e) {
        e.component.selectRowsByIndexes([0]);
    };
    /**
     * @return {?}
     */
    FrSelectListComponent.prototype.selectNextRow = function () {
        this.dataGrid.instance.clearSelection();
        this.shiftRowSelection(1);
    };
    /**
     * @return {?}
     */
    FrSelectListComponent.prototype.selectPreviousRow = function () {
        this.dataGrid.instance.clearSelection();
        this.shiftRowSelection(-1);
    };
    /**
     * @param {?} shiftrowcount
     * @return {?}
     */
    FrSelectListComponent.prototype.shiftRowSelection = function (shiftrowcount) {
        this.targetRow = (this.currentRow + shiftrowcount);
        this.currentRow = this.targetRow;
        this.dataGrid.instance.selectRowsByIndexes([this.targetRow]);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FrSelectListComponent.prototype.pressKeyUp = function (event) {
        if (event.keyCode === 38) {
            this.selectPreviousRow();
        }
        else if (event.keyCode === 40) {
            this.selectNextRow();
        }
        else if (event.keyCode === 13) {
            this.closeList(this.dataGrid.selectedRowKeys[0]);
        }
        else if (event.keyCode === 27) {
            this.closeList('');
        }
    };
    /**
     * @return {?}
     */
    FrSelectListComponent.prototype.clickOKBtn = function () {
        this.closeList(this.dataGrid.selectedRowKeys[0]);
    };
    /**
     * @return {?}
     */
    FrSelectListComponent.prototype.clickExitBtn = function () {
        this.closeList('');
    };
    /**
     * @param {?} data
     * @return {?}
     */
    FrSelectListComponent.prototype.closeList = function (data) {
        this.frSelectListService.emit('select:list:close', data);
    };
    return FrSelectListComponent;
}());
FrSelectListComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-fr-select-list',
                template: "<div class=\"listitems\" [style.width.%]=\"frSelectListService.listwidth\"> <dx-data-grid #selectedvalue id=\"gridContainer\" [dataSource]=\"frSelectListService.dataForListCreate\" [showBorders]=\"true\" (keyup)=\"pressKeyUp($event)\"  [selection]='{mode: \"single\",allowSelectAll: false}' (onContentReady)=\"onContentReadyHandler($event)\" [columnAutoWidth]=\"true\" [columns]=\"frSelectListService.columnForDisplay\"> <dxo-load-panel [enabled]=\"false\"></dxo-load-panel> <dxo-scrolling mode=\"virtual\"></dxo-scrolling> <dxo-filter-row [visible]=\"true\"></dxo-filter-row> <dxo-header-filter [visible]=\"true\"></dxo-header-filter> </dx-data-grid> <footer> <div style=\"display: flex;\"> <button class=\"button\" (click)=\"clickOKBtn()\">Ok</button> <button class=\"button\" (click)=\"clickKBBtn()\">KB</button> <button class=\"button\" (click)=\"clickExitBtn()\">Exit</button> </div> </footer> </div>",
                styles: [".listitems{   z-index: 1; position: fixed; bottom: 80px; right: 0; top: 90px; background-color: #f8f6ea; padding: 2px; } #gridContainer { height: calc(100% - 49px); background-color:transparent; } .button { background-color: rgb(255, 241, 168); border: none; color: black; height:48px; width:34%; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; } /* ------------------------------------ */"],
                host: { '(window:keyup)': 'pressKeyUp($event)' }
            },] },
];
/**
 * @nocollapse
 */
FrSelectListComponent.ctorParameters = function () { return [
    { type: FrSelectListService, },
]; };
FrSelectListComponent.propDecorators = {
    'dataGrid': [{ type: core.ViewChild, args: [devextremeAngular.DxDataGridComponent,] },],
};

var FrSelectListModule = (function () {
    function FrSelectListModule() {
    }
    /**
     * @return {?}
     */
    FrSelectListModule.forRoot = function () {
        return {
            ngModule: FrSelectListModule,
            providers: [FrSelectListService]
        };
    };
    return FrSelectListModule;
}());
FrSelectListModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    devextremeAngular.DxButtonModule,
                    devextremeAngular.DxTemplateModule,
                    devextremeAngular.DxTextAreaModule,
                    devextremeAngular.DxDataGridModule,
                    devextremeAngular.DxSelectBoxModule
                ],
                declarations: [
                    FrListLibraryComponent,
                    FrSelectListComponent
                ],
                exports: [
                    FrListLibraryComponent,
                    FrSelectListComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
FrSelectListModule.ctorParameters = function () { return []; };

exports.FrSelectListModule = FrSelectListModule;
exports.FrListLibraryComponent = FrListLibraryComponent;
exports.FrSelectListService = FrSelectListService;
exports.FrSelectListComponent = FrSelectListComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
