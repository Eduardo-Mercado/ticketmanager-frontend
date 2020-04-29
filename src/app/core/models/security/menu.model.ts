export class Option {
  idOption: number;
  name: string;
  path: string;
  nameCssClass: string;
  icon: string;
}

export class OptionApp {
  name: string;
  icon: string;
  id: number;
  nodes: Option[];
}
