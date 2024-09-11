//updated logic
function buyCoke() {
  const cokePrice = 25;
  let coinsPaid = valueFromBuyer(coinsInserted); // count money from the buyer
  let coinsinMachineValue = valueInMachine(coinsInMachine);

  if (coinsPaid > cokePrice) {
    let change = coinsPaid - cokePrice;
    isCokeInDelivery = true;
    cokesInStore--;

    // Try to give change
    let changeReturned = giveChange(change, coinsPaid, cokePrice);
    updateCoinsInMachine(coinsInserted, coinsInMachine);

    // Clear inserted coins after buying
    coinsInserted = [0, 0, 0, 0];

    if (changeReturned > coinsinMachineValue) {
      errorMessage = `Cannot return full change. Pick up your coke.`;

    } else {
      errorMessage = 'Pick up your coke and change.';
    }
  } else if (coinsPaid === cokePrice) {
    isCokeInDelivery = true;
    coinsInserted = [0, 0, 0, 0];
    errorMessage = 'Pick up your coke ';
    // forgot to update coke in store status
    cokesInStore--;

  } else {
    errorMessage = `${coinsPaid} is less than ${cokePrice}.`;
    isCokeInDelivery = false;
  }
  updateView();
}

function takeCoke() {
  if (cokesInStore > 0 && isCokeInDelivery === true) {
    errorMessage = 'Coke Taken';
  const boughtCokesContainer = document.getElementById('bought-cokes');
    boughtCokesContainer.innerHTML += repeatImgDivHtml('coke', 'coke', 1);
    
  isCokeInDelivery = false; // After taking the coke, reset the flag
} else {
  errorMessage = 'No Coke to take';
}
updateView();
}

function insertCoin(value) {
  if (value === 1) {
    coinsInserted[0]++;
  } else if (value === 5) {
    coinsInserted[1]++;
  } else if (value === 10) {
    coinsInserted[2]++;
  } else if (value === 20) {
    coinsInserted[3]++;
  }

  updateView();
}

function returnCoins() {
  coinsReturned = [...coinsInserted];
  coinsInserted = [0, 0, 0, 0];
  updateView();
}

function takeCoins() {
  coinsReturned = [0, 0, 0, 0];
  updateView();
}

function valueFromBuyer(coinsInserted) {
  return coinsInserted[0] * 1
    + coinsInserted[1] * 5
    + coinsInserted[2] * 10
    + coinsInserted[3] * 20;
}
//   let value = 0;
//   value += coinsInserted[0] * 1;
//   value += coinsInserted[1] * 5;
//   value += coinsInserted[2] * 10;
//   value += coinsInserted[3] * 20;
//   return value;
// }

function valueInMachine(coinsInMachine) {
  return coinsInMachine[0] * 1
    + coinsInMachine[1] * 5
    + coinsInMachine[2] * 10
    + coinsInMachine[3] * 20;
}
//   let value = 0;
//   value += coinsInMachine[0] * 1;
//   value += coinsInMachine[1] * 5;
//   value += coinsInMachine[2] * 10;
//   value += coinsInMachine[3] * 20;
//   return value;
// }

function giveChange(change) {
  const coinsType = [20, 10, 5, 1];
  let changeAmount = change;
  //reset
  coinsReturned = [0, 0, 0, 0];

  for (let i = 0; i < coinsType.length; i++) {
    //finding out each coin type
    let coinType = coinsType[i];
    //finding out how many coins can be given
    let numberOfCoins = Math.min(Math.floor(changeAmount / coinType), coinsInMachine[3 - i]);
    //update amount of change
    changeAmount -= numberOfCoins * coinType;
    //update coins returned
    coinsReturned[3 - i] = numberOfCoins;
    //update coins in machine
    coinsInMachine[3 - i] -= numberOfCoins;
  }
  updateView();

}
function regret() {
  isCokeInDelivery = false;
  coinsReturned = [0, 0, 0, 0];
}

//updared function
//using index to add the coins
function updateCoinsInMachine(coinsInserted, coinsInMachine) {

  for (let i = 0; i < coinsInserted.length; i++) {
    coinsInMachine[i] += coinsInserted[i]
  }
}
