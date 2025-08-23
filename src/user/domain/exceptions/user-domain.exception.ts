export class UserDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserDomainException';
  }
}

export class InvalidNameException extends UserDomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidNameException';
  }
}

export class InvalidPasswordException extends UserDomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPasswordException';
  }
}

export class DuplicateEmailException extends UserDomainException {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateEmailException';
  }
}

export class UserNotFoundException extends UserDomainException {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundException';
  }
}