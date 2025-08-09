export class UserEntity {
  constructor({
    id,
    email,
    password,
    salt,
    name,
    createdAt,
    updatedAt,
  }: {
    id: number;
    email: string;
    password: string;
    salt: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  id: number;
  email: string;
  password: string;
  salt: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
