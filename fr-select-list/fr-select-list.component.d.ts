import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DxDataGridComponent } from "devextreme-angular";
import { FrSelectListService } from '../fr-select-list.service';
export declare class FrSelectListComponent implements OnInit {
    private frSelectListService;
    dataGrid: DxDataGridComponent;
    currentRow: number;
    targetRow: number;
    subscriptions: Subscription;
    constructor(frSelectListService: FrSelectListService);
    ngOnInit(): void;
    selectSingleRow(key: any, preserve: any): void;
    onContentReadyHandler(e: any): void;
    private selectNextRow();
    private selectPreviousRow();
    private shiftRowSelection(shiftrowcount);
    private pressKeyUp(event);
    private clickOKBtn();
    private clickExitBtn();
    closeList(data: any): void;
}
