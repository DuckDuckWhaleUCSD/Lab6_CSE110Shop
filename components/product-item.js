// product-item.js

"use strict";

const ITEM_PREFIX = 'item_';

const product_list = document.getElementById('product-list');

class ProductItem extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		const item = document.createElement('li');
		item.setAttribute('class', 'product');

		const image = item.appendChild(document.createElement('img'));
		image.setAttribute('src', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg');
		image.setAttribute('alt', 'Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops');
		image.setAttribute('width', '200');
		this.image = image;

		const title = item.appendChild(document.createElement('p'));
		title.setAttribute('class', 'title');
		title.textContent = 'Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops';
		this.card_title = title;

		const price = item.appendChild(document.createElement('p'));
		price.setAttribute('class', 'price');
		price.textContent = '$109.95';
		this.price = price;

		const button = item.appendChild(document.createElement('button'));

		button.textContent = 'Add to Cart';
		this.button = button;

		const style = document.createElement('style');
		style.textContent = `
.price {
  color: green;
  font-size: 1.8em;
  font-weight: bold;
  margin: 0;
}

.product {
  align-items: center;
  background-color: white;
  border-radius: 5px;
  display: grid;
  grid-template-areas:
  'image'
  'title'
  'price'
  'add';
  grid-template-rows: 67% 11% 11% 11%;
  height: 450px;
  filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
  margin: 0 30px 30px 0;
  padding: 10px 20px;
  width: 200px;
}

.product > button {
  background-color: rgb(255, 208, 0);
  border: none;
  border-radius: 5px;
  color: black;
  justify-self: center;
  max-height: 35px;
  padding: 8px 20px;
  transition: 0.1s ease all;
}

.product > button:hover {
  background-color: rgb(255, 166, 0);
  cursor: pointer;
  transition: 0.1s ease all;
}

.product > img {
  align-self: center;
  justify-self: center;
  width: 100%;
}

.title {
  font-size: 1.1em;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title:hover {
  font-size: 1.1em;
  margin: 0;
  white-space: wrap;
  overflow: auto;
  text-overflow: unset;
}`;
		this.shadowRoot.append(style, item);
	}

	update(data) {
		this.image.src = data.image;
		this.image.alt = data.title;

		this.card_title.textContent = data.title;

		this.price.textContent = '$' + data.price;

		function add(event) {
			const count = document.getElementById('cart-count');
			count.textContent = (Number(count.textContent) + 1).toString()
			event.target.textContent = 'Remove from Cart';
			event.target.onclick = remove;
			window.localStorage.setItem(ITEM_PREFIX + data.id, '');
		};

		function remove(event) {
			const count = document.getElementById('cart-count');
			count.textContent = (Number(count.textContent) - 1).toString()
			event.target.textContent = 'Add to Cart';
			event.target.onclick = add;
			window.localStorage.removeItem(ITEM_PREFIX + data.id);
		};

		if (window.localStorage.getItem(ITEM_PREFIX + data.id) === null) {
			this.button.textContent = 'Add to Cart';
			this.button.onclick = add;
		} else {
			const count = document.getElementById('cart-count');
			count.textContent = (Number(count.textContent) + 1).toString()
			this.button.textContent = 'Remove from Cart';
			this.button.onclick = remove;
		}
	}
}

customElements.define('product-item', ProductItem);
