export interface Todo {
  Name: string;
  Short_Description: string;
  Deadline: Date;
  Status: string;
}

export interface TodoInterface {
  id: string;
  Name: string;
  Short_Description: string;
  Deadline: Date;
  Status: string;
  User: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoResponseInterface {
  _id: string;
  Name: string;
  Short_Description: string;
  Deadline: Date;
  Status: string;
  User: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
