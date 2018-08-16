/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var product of Product.allProducts) {
    var optionElement = document.createElement('option');
    optionElement.innerText = product.name;
    selectElement.appendChild(optionElement);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(e) {

  e.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

function addSelectedItemToCart() {
  var selectedIndex = document.getElementsByTagName('select')[0].selectedIndex;
  var selectedProduct = document.getElementsByTagName('option')[selectedIndex].innerText;
  var quantity = parseInt(document.getElementsByTagName('input')[0].value);
  Cart.prototype.addItem(selectedProduct, quantity);
}

function updateCounter() {
  var cartCountSpan = document.getElementsByTagName('span')[0];
  cartCountSpan.innerText = Cart.items.length ? ` ${Cart.items.length}` : ' 0';
}

function updateCartPreview() {
  var cartContentsDiv = document.getElementsByClassName('card')[2];
  while (cartContentsDiv.firstChild) {
    cartContentsDiv.removeChild(cartContentsDiv.firstChild);
  }
  Cart.items.forEach(function(product) {
    var cartPreviewDiv = document.createElement('p');
    cartPreviewDiv.innerText = `${product.product}: ${product.quantity}`;
    cartContentsDiv.appendChild(cartPreviewDiv);
  });
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
