import Registry from './transfersRegistry';

class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    /* other props like address, phone, etc*/
    private registry: Registry
  ) { }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  getBalance(): number {
    return (
      this.registry.sum({ toPerson: this }) -
      this.registry.sum({ fromPerson: this })
    )
  }
}

export default Person;
