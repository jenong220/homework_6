//let shoppingCart = [];
//let totalNum = 0;

let storedCart = [];
let storedTotal = 0;

//functions for the Glaze Toggle
function chooseGlaze() {
  document.getElementById("glazeDropdown").classList.toggle("show");
}

function chosenGlaze(element) {
  let glazeType = element.innerHTML;
  let addButton = document.getElementById("add-to-cart");
  document.getElementById("glaze-header").innerHTML = glazeType;
  document.getElementById("glazeDropdown").classList.remove("show");
  if (document.getElementById("quant-header").innerHTML != "Choose Quantity Here!") {
    addButton.disabled = false;
    addButton.innerHTML = "Add to Cart!";
  }
}

//functions for the quantity toggle
function chooseQuant() {
  document.getElementById("quantDropdown").classList.toggle("show");
}

function chosenQuant(element) {
  let quantType = element.innerHTML;
  let addButton = document.getElementById("add-to-cart");
  document.getElementById("quant-header").innerHTML = quantType;
  document.getElementById("quantDropdown").classList.remove("show");
  if (document.getElementById("glaze-header").innerHTML != "Choose Glaze Here!") {
    addButton.disabled = false;
    addButton.innerHTML = "Add to Cart!";
  }
}

function addButton() {
  let bunName = document.getElementById("product-header").innerHTML;
  let glazeType = document.getElementById("glaze-header").innerHTML;
  let quantType = document.getElementById("quant-header").innerHTML;
  let quantNum = 0;
  let added = false;
  if (quantType == "Single roll") {
    quantNum = 1;
  } else if (quantType == "Three rolls") {
    quantNum = 3;
  } else if (quantType == "Half a dozen rolls") {
    quantNum = 6;
  } else {
    quantNum = 12;
  }
//  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
  let shoppingCart = JSON.parse(localStorage.getItem("storedCart"));
  console.log(shoppingCart);
  let totalNum = JSON.parse(localStorage.getItem("storedTotal"));

  if ((shoppingCart === null || shoppingCart.length === 0)) {
    console.log("we're null");
    shoppingCart = [];
    shoppingCart.push([bunName, glazeType, quantNum]);
  } else {
    for (order in shoppingCart) {
      console.log(order);
      if ((shoppingCart[order][0] === bunName) && (shoppingCart[order][1] === glazeType)) {
        shoppingCart[order][2] += quantNum;
        added = true;
        break;
      }
    }
    if (!added) {
      shoppingCart.push([bunName, glazeType, quantNum]);
    }
  }
  console.log(shoppingCart);

  for (order in shoppingCart) {
    console.log(shoppingCart[order][0] + ": " + shoppingCart[order][1] + " " + shoppingCart[order][2]);
  }
  totalNum += quantNum;
  localStorage.setItem("storedCart", JSON.stringify(shoppingCart));
  localStorage.setItem("storedTotal", JSON.stringify(totalNum));

  console.log(shoppingCart);
  document.getElementById("faint-text").innerHTML = "You have " + totalNum + " buns in your cart!";
  document.getElementById("faint-text").style.fontWeight = "bolder";
  document.getElementById("faint-text").style.fontSize = "20px";
  alert("Success! Your order of " + quantNum + " of the " + bunName + " with " + glazeType + " glaze has been added to your plate!");

  document.getElementById("glaze-header").innerHTML = "Choose Glaze Here!";
  document.getElementById("quant-header").innerHTML = "Choose Quantity Here!";
  document.getElementById("add-to-cart").innerHTML = "Select Above!";
  document.getElementById("add-to-cart").disabled = true;
}

function onLoad() {
  console.log("Test the screen print");
  let shoppingCart = JSON.parse(localStorage.getItem("storedCart"));
  let totalNum = JSON.parse(localStorage.getItem("storedTotal"));
  if (shoppingCart === null) {
    console.log("No Orders!");
    return;
  } else {
    console.log(shoppingCart);
    document.getElementById("faint-text").innerHTML = "You have " + totalNum + " buns in your cart!";
    document.getElementById("faint-text").style.fontWeight = "bolder";
    document.getElementById("faint-text").style.fontSize = "20px";
  }

}

function onLoadTotals() {
  console.log("Test the screen print");
  let prices = [["Original Roll", 3.5],["The Blackberry Bun", 4.0]];
  let totalPrice = 0;
  var dollarAmt = new Intl.NumberFormat('en-US', {style: 'currency', currency:'USD', minimumFractionDigits: 2});
  let yourItemsBody = document.getElementById("your-items");
  let shoppingCart = JSON.parse(localStorage.getItem("storedCart"));
  let totalNum = JSON.parse(localStorage.getItem("storedTotal"));
  if (shoppingCart === null) {
    console.log("No Orders!");
    return;
  } else {
    console.log(shoppingCart);
    for (item in shoppingCart) {
      let newBun = document.createElement('h3');
      let newQuant = document.createElement('p');
      let newDollars = document.createElement('p');

      if ((shoppingCart[item][0] === "Original Roll") || (shoppingCart[item][0] === "Original (Gluten-Free) Roll")) {
        totalPrice += shoppingCart[item][2] * 3.5;
        newDollars.innerHTML = dollarAmt.format(3.5);
      } else if ((shoppingCart[item][0] === "The Blackberry Bun")|| (shoppingCart[item][0] === "The Pumpkin Spice Bun")) {
        totalPrice += shoppingCart[item][2] * 4.0;
        newDollars.innerHTML = dollarAmt.format(4.0);
      } else if ((shoppingCart[item][0] === "The Walnut Roll") || (shoppingCart[item][0] === "The Caramel Pecan Roll")) {
        totalPrice += shoppingCart[item][2] * 3.75;
        newDollars.innerHTML = dollarAmt.format(3.75);
      }

      newBun.innerHTML = shoppingCart[item][0] + " with " + shoppingCart[item][1] + " glaze";
      newQuant.innerHTML = shoppingCart[item][2];

      yourItemsBody.appendChild(newBun);
      yourItemsBody.appendChild(newQuant);
      yourItemsBody.appendChild(newDollars);
    }
  }
  document.getElementById("totalCount").innerHTML = totalNum;
  document.getElementById("totalQuant").innerHTML = dollarAmt.format(totalPrice);

}
//window.onclick = function(event) {
//  if (!event.target.matches("glaze-dropdown")) {
//    document.getElementById("glazeDropdown").classList.remove("show");
//  }
//  if (!event.target.matches("quant-dropdown")) {
//    document.getElementById("quantDropdown").classList.remove("show");
//  }
//}
