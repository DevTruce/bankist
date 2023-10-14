'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
//// Data
const account1 = {
  owner: 'Truce Ramcharitar',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300], // transactions
  interestRate: 1.2, // %
  username: 'TruceR',
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
//// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
//// COMPUTING USERNAMES
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0].toUpperCase())
      .join('');
  });
};

createUsernames(accounts);
console.log(accounts);

/////////////////////////////////////////////////
//// DISPLAY MOVEMENTS/TRANSACTIONS
const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // clear container

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // build movements html
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html); // fill container
  });
};

// display movements
displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

/////////////////////////////////////////////////
//// CALCULATE AND DISPLAY TOTAL BALANCE
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((accu, cur) => accu + cur, 0);
  labelBalance.textContent = `$${balance}`;
  console.log(balance); // debug
};

calcDisplayBalance(account1.movements);

/*
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//// LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for loop method
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log(`----------------------------------`);

// forEach method
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});


/////////////////////////////////////////////////
//// SLICE METHOD
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr);
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(-2));
console.log(arr.slice(-3));
console.log(arr.slice(1, -2));
console.log(arr);
console.log(arr.slice()); // shalllow copy of array

console.log(`----------------------------------`);
/////////////////////////////////////////////////
//// SPLICE METHOD
console.log(arr);
console.log(arr.splice(2));
console.log(arr);
console.log(arr.splice(-1));
console.log(arr);

console.log(`----------------------------------`);
/////////////////////////////////////////////////
//// REVERSE METHOD
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse());
console.log(arr2);

console.log(`----------------------------------`);
/////////////////////////////////////////////////
//// CONCAT METHOD
const letters = arr.concat(arr2);

console.log(letters); // concat
console.log([...arr, ...arr2]); // spread operator

console.log(`----------------------------------`);
/////////////////////////////////////////////////
//// JOIN METHOD
console.log(letters.join(' - '));

/////////////////////////////////////////////////
//// AT METHOD
const arr3 = [23, 11, 64];
console.log(arr3[0]); // traditional way of displaying specific value
console.log(arr3.at(0)); // at method way of displaying specific value

// getting last array element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));


// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currencies2 = new Set(['USD', 'EUR', 'GBP']);

currencies2.forEach(function (value, _, map) {
  console.log(`${_}: ${value}`);
});
*/

/*
/////////////////////////////////////////////////
//// MAP METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

/////////////////////////////////////////////////
//// map method example
// const movementsUSD = movements.map(function (mov) {
//   return mov * euroToUsd;
// });

/////////////////////////////////////////////////
//// map method w/arrow function
const movementsUSD = movements.map(mov => mov * euroToUsd);

console.log(movements);
console.log(movementsUSD);

console.log(`----------------------------------`);
/////////////////////////////////////////////////
//// for of mimic of map example above
const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * euroToUsd);
}
console.log(movements);
console.log(movementsUSDfor);

console.log(`----------------------------------`);

/////////////////////////////////////////////////
//// more method examples
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);
*/

/*
/////////////////////////////////////////////////
//// FILTER METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const desposits = movements.filter(function (mov, i, arr) {
  return mov > 0; // return boolean value
});
console.log(movements);
console.log(desposits);

// for of version
const despositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    despositsFor.push(mov);
  }
}

console.log(movements);
console.log(despositsFor);

/////////////////////////////////////////////////
//// WITHDRAWAL CHAL

// for of
const withdrawalsFor = [];

for (const mov of movements) {
  if (mov < 0) {
    withdrawalsFor.push(mov);
  }
}

// filter method w/arrow function
const withdrawals = movements.filter(mov => mov < 0);

console.log(withdrawalsFor);
console.log(withdrawals);
*/

/*
/////////////////////////////////////////////////
//// REDUCE METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// accumulator -> snowball
// const balance = movements.reduce(function (accu, cur, index, array) {
//   console.log(`Iteration ${index}: ${accu}`);
//   return accu + cur;
// }, 0);
// console.log(balance);

const balance = movements.reduce((accu, cur, index, array) => accu + cur, 0);
console.log(balance);

// for loop version
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(`for ${balance2}`);
*/
