export class UserEntity {
  constructor(
    public readonly id: string,
    public email: string,
    public password: string,
    public name?: string,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  // Business methods
  updateName(name: string): void {
    this.name = name;
    this.updatedAt = new Date();
  }

  updatePassword(password: string): void {
    this.password = password;
    this.updatedAt = new Date();
  }

  // Factory method
  static create(id: string, email: string, password: string, name?: string): UserEntity {
    return new UserEntity(id, email, password, name, new Date(), new Date());
  }
}
