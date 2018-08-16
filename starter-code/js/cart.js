/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;
var cartTableBody = document.getElementsByTagName('tbody')[0];

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

function clearCart() {
  while (cartTableBody.firstChild) {
    cartTableBody.removeChild(cartTableBody.firstChild);
  }
}


function showCart() {
  var rowIndex = 0;
  cart.items.forEach(function(product) {
    var cartTableRow = document.createElement('tr');
    var deleteLink = document.createElement('td');
    deleteLink.innerText = 'X';
    deleteLink.setAttribute('data-delete', rowIndex);
    var quantityData = document.createElement('td');
    quantityData.innerText = product.quantity;
    var productNameData = document.createElement('td');
    productNameData.innerText = product.product;
    cartTableRow.appendChild(deleteLink);
    cartTableRow.appendChild(quantityData);
    cartTableRow.appendChild(productNameData);
    cartTableBody.appendChild(cartTableRow);
    rowIndex++;
  });
}

function removeItemFromCart(e) {
  var indexToDelete = e.target.getAttribute('data-delete');
  cart.removeItem(indexToDelete, cart);
  clearCart();
  showCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
