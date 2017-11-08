import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
export declare class FrSelectListService {
    subject: Subject<any>;
    listwidth: number;
    dataForListCreate: any;
    columnForDisplay: any;
    constructor();
    getDataForListCreate(dataForListCreate: any, columnForDisplay: any): void;
    filterOn(id: string): Observable<any>;
    emit(id: string, options?: any): void;
}
