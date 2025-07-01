export class User {
  constructor(
    private readonly id: string,
    private email: string,
    private password: string,
    private name?: string,
    private readonly createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  // Getters
  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getName(): string | undefined {
    return this.name;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

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
  static create(id: string, email: string, password: string, name?: string): User {
    return new User(id, email, password, name, new Date(), new Date());
  }
}
