'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
//// DATA
const account1 = {
  owner: 'Truce Ramcharitar',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300], // transactions
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Meagan M',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Johnny Test',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Timmy Turner',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
      .map(name => name[0].toUpperCase())
      .join('');
  });
};
createUsernames(accounts);

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
        <div class="movements__value">$${Math.abs(mov)}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html); // fill container
  });
};

// display movements
// displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

/////////////////////////////////////////////////
//// CALCULATE AND DISPLAY TOTAL BALANCE
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accu, cur) => accu + cur, 0);
  labelBalance.textContent = `$${Number(acc.balance)}`;
};

// calcDisplayBalance(account1.movements);

/////////////////////////////////////////////////
//// CALCULATE IN/OUT/INTEREST

const calcDisplaySummary = function (acc) {
  // income
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((accu, cur) => accu + cur, 0);
  labelSumIn.textContent = `$${income}`;

  // outgoing
  const outgoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((accu, cur) => accu + cur, 0);
  labelSumOut.textContent = `$${Math.abs(outgoing)}`;

  // interest
  let interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((accu, int) => accu + int, 0);

  interest = Math.abs(interest);
  labelSumInterest.textContent = `$${Math.round(interest)}`;
};

// calcDisplaySummary(account1.movements);

/////////////////////////////////////////////////
//// UPDATE UI
const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);

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
};

/////////////////////////////////////////////////
//// LOGIN LOGIC
let currentAccount;

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
    // add positive and negative movements to correct accounts
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // update ui
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
//// REQUEST LOAN
btnLoan.addEventListener('click', function (event) {
  event.preventDefault(); // diable form submit

  const amount = inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    currentAccount.movements.push(Number(amount)); //add money to user

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
