export class OptionApp {
  idOption: number;
  name: string;
  path: string;
  nameCssClass: string;
  icon: string;

  constructor(id: number, name: string, path: string, icon: string) {
    this.idOption = id;
    this.name = name;
    this.path = path;
    this.nameCssClass = 'sidebar-item';
    this.icon = icon;
  }
}
