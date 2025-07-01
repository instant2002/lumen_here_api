export class IdGeneratorUtil {
  static getRandomUUID(): string {
    return crypto.randomUUID();
  }
}
