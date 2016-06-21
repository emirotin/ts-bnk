import Account from './account';

class Transfer {
  id: string;
  timestamp: Number;

  constructor(public from: Account, public to: Account, public amount: number) {
    this.id = `Math.random()`.substring(2);
    this.timestamp = Date.now();
  }

  toString(): string {
    return `[${this.from.toString()}] -> [${this.to.toString()}]: $${this.amount}`
  }
}

export default Transfer;
