import Registry from './transfersRegistry';

class Bank {
  constructor(public name: string, private registry: Registry) {

  }

  getBalance(): number {
    return (
      this.registry.sum({ toBank: this }) -
      this.registry.sum({ fromBank: this })
    )
  }
}

export default Bank;
