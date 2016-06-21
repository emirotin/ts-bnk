import Bank from './bank';
import Person from './person';
import Account from './account';
import Transfer from './transfer';

export interface TransferSearchParams {
  fromBank?: Bank;
  toBank?: Bank;
  fromPerson?: Person;
  toPerson?: Person;
  fromAccount?: Account;
  toAccount?: Account;
}

class TransferRegistry {
  private transfers: Transfer[];

  constructor() {
    this.transfers = [];
  }

  private add(transfer: Transfer) {
    this.transfers.push(transfer);
  }

  public makeTransfer(from: Account, to: Account, amount: number) {
    this.add(new Transfer(from, to, amount));
  }

  public find(searchParams?: TransferSearchParams): Transfer[] {
    let transfers = this.transfers;
    if (searchParams == null) {
      return transfers;
    }

    if (searchParams.fromBank != null) {
      transfers = transfers.filter(t => t.from.bank === searchParams.fromBank)
    }
    if (searchParams.toBank != null) {
      transfers = transfers.filter(t => t.to.bank === searchParams.toBank)
    }
    if (searchParams.fromAccount != null) {
      transfers = transfers.filter(t => t.from === searchParams.fromAccount)
    }
    if (searchParams.toAccount != null) {
      transfers = transfers.filter(t => t.to === searchParams.toAccount)
    }
    if (searchParams.fromPerson != null) {
      transfers = transfers.filter(t => t.from.owner === searchParams.fromPerson)
    }
    if (searchParams.toPerson != null) {
      transfers = transfers.filter(t => t.to.owner === searchParams.toPerson)
    }
    return transfers;
  }

  public getAll() {
    return this.transfers;
  }

  public sum(searchParams: TransferSearchParams): number {
    return this.find(searchParams).reduce(((acc, t) => acc + t.amount), 0)
  }
}

export default TransferRegistry;
