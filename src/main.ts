import Person from './lib/models/person';
import Account from './lib/models/account';
import Bank from './lib/models/bank';
import Transfer from './lib/models/transfer';
import Registry from './lib/models/transfersRegistry';

const registry = new Registry()

const DBGermany = new Bank('DB Germany', registry)
const DBAmericas = new Bank('DB Americas', registry)

const JohnSmith = new Person('John', 'Smith', registry)
const JaneDoe = new Person('Jane', 'Doe', registry)

const johnAccGermany = new Account(DBGermany, JohnSmith, 'DBG_1', registry)
const janeAccGermany = new Account(DBGermany, JaneDoe, 'DBG_2', registry)

const johnAccAmerica = new Account(DBAmericas, JohnSmith, 'DBA_1', registry)
const janeAccAmerica = new Account(DBAmericas, JaneDoe, 'DBA_2', registry)

registry.makeTransfer(johnAccAmerica, johnAccGermany, 100)
registry.makeTransfer(johnAccAmerica, johnAccGermany, 100)
registry.makeTransfer(janeAccAmerica, johnAccGermany, 100)
registry.makeTransfer(janeAccAmerica, janeAccGermany, 100)


console.log('All transfers');
console.log('---');
let n = 0;
for (const t of registry.getAll()) {
  console.log(++n, t.toString());
}
console.log('---');

console.log("John's balance:", JohnSmith.getBalance())
console.log("Jane's balance in DB Americas:", janeAccAmerica.getBalance())
console.log("DB Americas balance:", DBAmericas.getBalance())
console.log("DB Germany balance:", DBGermany.getBalance())

function assertEqual(a: any, b: any, message?: string) {
  if (a != b) {
    throw new Error(message || 'Assert failed');
  }
}

console.log('Running tests...');

assertEqual(JohnSmith.getBalance(), 100);
assertEqual(janeAccAmerica.getBalance(), -200);
assertEqual(DBAmericas.getBalance(), -400);
assertEqual(DBGermany.getBalance(), 400);

console.log('...OK');
