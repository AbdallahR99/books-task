import { Base } from "./_base.model";

export class Book extends Base {
  constructor(
    public title: string | null = null,
    public year: number | null = null,
    public author: string | null = null,
    public collection: string | null = '',
  ) {super();}
}
