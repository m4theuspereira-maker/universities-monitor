export interface IReposiroty {
  save(input: any): Promise<any>;

  findOne(input: any): Promise<any>;

  update(id: string, updatePayload: any): Promise<any | null>;
}

export interface IFindUserDto {
  username?: string;
  _id?: string;
}
