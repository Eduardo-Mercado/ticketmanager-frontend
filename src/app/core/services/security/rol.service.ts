import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OptionApp, Option } from '../../models/security/menu.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private Url = environment.baseUrl + '/rol';
  constructor(private http: HttpClient) { }

  getoptionsByRol(id: number): Observable<OptionApp[]> {
    const root: OptionApp[] = [];
    return this.http.get<OptionApp[]>(this.Url + '/options/' + id).pipe(
      map( (info: any) => {
        info.forEach(element => {
           if (element.IdParent === 0) {
            const parent = new OptionApp();
            parent.icon = element.Icon;
            parent.name = element.Name;
            parent.id = element.IdOption;
            const nodes: Option[] = [];
            parent.nodes = nodes;
            root.push(parent);
           }
        });

        root.forEach(parent => {
          info.forEach(element => {
            if (element.IdParent !== 0 && element.IdParent === parent.id) {
            const node = new Option();
            node.icon = element.Icon;
            node.idOption = element.IdOption;
            node.name = element.Name;
            node.nameCssClass = '';
            node.path = element.URL;
            parent.nodes.push(node);
            }
          });
        });
        return root;
      })
    );
  }
}
