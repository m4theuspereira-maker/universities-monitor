export interface IReposiroty {
  save(input: any): Promise<any>;

  findOne(id: string): Promise<any>;

  update(id: string, updatePayload: any): Promise<any | null>;
}
