import Bank from './bank';
import Person from './person';
import Registry from './transfersRegistry';

class Account {
  constructor(public bank: Bank, public owner: Person, public number: string, private registry: Registry) {

  }

  getBalance(): number {
    return (
      this.registry.sum({ toAccount: this }) -
      this.registry.sum({ fromAccount: this })
    )
  }

  toString(): string {
    return `#${this.number}, owner: ${this.owner.fullName()}, bank: ${this.bank.name}`
  }
}

export default Account;
