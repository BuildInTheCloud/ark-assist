import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//-- This class provides the service with methods to read static data.

@Injectable()
export class StaticService {

  constructor(private http: Http) {}

  getEntityList(jsonFileName:string): any {
    //console.log("DATA: ", jsonFileName);
    return new Promise(resolve => {
      this.http.get("assets/data/"+jsonFileName.toLowerCase()+".json")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        })
      ;
    });
  }

  getColorList(): any {
    return new Promise(resolve => {
      this.http.get('assets/data/colors.json')
        .map(res => res.json() )
        .subscribe(data => {
          resolve(data);
        })
      ;
    });
  }

  getDinoList(): any {
    return new Promise(resolve => {
      this.http.get('assets/data/dinos.json')
        .map(res => res.json() )
        .subscribe(data => {
          resolve(data);
        })
      ;
    });
  }

  getCommandList(): any {
    return new Promise(resolve => {
      this.http.get('assets/data/commands.json')
        .map((res: Response) => res.json())
        .subscribe(data => {
          resolve(data);
        })
      ;
    });
  }

  getFavsList(): any {
    return new Promise(resolve => {
      this.http.get('assets/data/favs.json')
        .map((res: Response) => res.json())
        .subscribe(data => {
          resolve(data);
        })
      ;
    });
  }

  getEntity(id: number): Observable<string[]> {
    return this.http.get('assets/data/----.json')
      .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  //-- Handle HTTP error
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}


