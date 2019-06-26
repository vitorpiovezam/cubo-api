export class User {
  firstName?: string;
  lastName?: string;
  participation?: number;

  constructor(firstName?: string, lastName?: string, participation?: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.participation = participation;
  }
}
