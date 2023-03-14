export interface IReposiroty {
  save(input: any): Promise<any>;

  findOne(id: string): Promise<any>;
}
