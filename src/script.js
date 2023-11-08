'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
//// DATA
const account1 = {
  owner: 'Truce R',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-10-28T13:00:00.000Z',
    '2023-10-31T13:00:00.000Z',
    '2023-11-01T13:00:00.000Z',
    '2023-11-02T13:00:00.000Z',
    '2023-11-03T13:00:00.000Z',
    '2023-11-04T13:00:00.000Z',
    '2023-11-05T13:00:00.000Z',
    '2023-11-07T13:00:00.000Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Meagan R',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2023-10-28T13:00:00.000Z',
    '2023-10-31T13:00:00.000Z',
    '2023-11-01T13:00:00.000Z',
    '2023-11-02T13:00:00.000Z',
    '2023-11-03T13:00:00.000Z',
    '2023-11-04T13:00:00.000Z',
    '2023-11-05T13:00:00.000Z',
    '2023-11-07T13:00:00.000Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
//// ELEMENTS
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
      .map(name => name[0].toLowerCase())
      .join('');
  });
};
createUsernames(accounts);

/////////////////////////////////////////////////
//// CALCULATE DAYS PASSED
const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(`Days passed: ${daysPassed}`);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const day = `${date.getDate()}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
};

/////////////////////////////////////////////////
//// DISPLAY MOVEMENTS/TRANSACTIONS
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; // clear container

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements; // adapted function to sort movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);

    // build movements html
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">$${mov.toFixed(2)}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html); // fill container
  });
};

/////////////////////////////////////////////////
//// CALCULATE AND DISPLAY TOTAL BALANCE
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accu, cur) => accu + cur, 0);
  labelBalance.textContent = `$${Number(acc.balance.toFixed(2))}`;
};

/////////////////////////////////////////////////
//// CALCULATE IN/OUT/INTEREST

const calcDisplaySummary = function (acc) {
  // income
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((accu, cur) => accu + cur, 0);
  labelSumIn.textContent = `$${income.toFixed(2)}`;

  // outgoing
  const outgoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((accu, cur) => accu + cur, 0);
  labelSumOut.textContent = `$${outgoing.toFixed(2)}`;

  // interest
  let interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((accu, int) => accu + int, 0);

  labelSumInterest.textContent = `$${interest.toFixed(2)}`;
};

// calcDisplaySummary(account1.movements);

/////////////////////////////////////////////////
//// UPDATE UI
const updateUI = function (acc) {
  // display movements
  displayMovements(acc);

  // display balance
  calcDisplayBalance(acc);

  // display summary
  calcDisplaySummary(acc);

  // clear input fields and remove focus for transfer inputs
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  // clear input fields and remove focus for login inputs
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  inputLoginUsername.blur();

  // clear input fields and remove focus for close account inputs
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
  inputCloseUsername.blur();

  // clear input fields and remove focus for close account inputs
  btnLoan.value = '';
  btnLoan.blur();
};

/////////////////////////////////////////////////
//// LOGIN LOGIC
let currentAccount;

//// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); // diable form submit

  // check username
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  // check pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and welcome message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;

    // create and display current date and time
    const now = new Date();
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const day = `${now.getDate()}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const minute = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${month}/${day}/${year}, ${hour}:${minute}`;

    // update ui
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
//// TRANSFER FUNDS
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault(); // diable form submit

  const amount = Number(inputTransferAmount.value); // transfer amount

  // check if username input is valid
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // check if transfer is valid
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc.username !== currentAccount.username
  ) {
    // transfer action
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // add transfer dates
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());

    // update ui
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
//// REQUEST LOAN
btnLoan.addEventListener('click', function (event) {
  event.preventDefault(); // diable form submit

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    currentAccount.movementsDates.push(new Date().toISOString()); // add transfer date
    currentAccount.movements.push(Number(amount)); // add loan to user
    console.log(new Date());
    // update ui
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
//// CLOSE ACCOUNT
btnClose.addEventListener('click', function (event) {
  event.preventDefault(); // diable form submit

  // check and store user and pin inputs
  const confirmUser = inputCloseUsername.value;
  const confirmPin = Number(inputClosePin.value);

  // check if user and pin inputs are valid
  if (
    confirmUser === currentAccount.username &&
    confirmPin === currentAccount.pin
  ) {
    // gather index of account to delete
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // delete account from array
    accounts.splice(index, 1);

    // update ui
    updateUI(currentAccount);

    // hide ui
    containerApp.style.opacity = 0;
  }
});

/////////////////////////////////////////////////
//// TIMEOUT USER

/////////////////////////////////////////////////
//// SORT MOVEMENTS
let sorted = false;

btnSort.addEventListener('click', function (event) {
  event.preventDefault();

  // if (sorted === false) {
  //   sorted = true;
  //   displayMovements(currentAccount.movements, true);
  // } else {
  //   sorted = false;
  //   displayMovements(currentAccount.movements, false);
  // }

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
//// CALCULATE ALL USER MOVEMENTS
const overallBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((accu, cur) => accu + cur, 0);
console.log(overallBalance);
