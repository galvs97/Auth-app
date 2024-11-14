export class User {
  type: number;
  name: string;
  telephone: string;
  email: string;
  identificationNumber: string;
  birthDate: string; 
  authMethod: string;

  constructor(
    type: number,
    name: string,
    telephone: string,
    email: string,
    identificationNumber: string,
    birthDate: string,
    authMethod: string
  ) {
    this.type = type;
    this.name = name;
    this.telephone = telephone;
    this.email = email;
    this.identificationNumber = identificationNumber;
    this.birthDate = birthDate;
    this.authMethod = authMethod;
  }
}
