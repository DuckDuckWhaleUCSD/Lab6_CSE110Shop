// Script.js

"use strict";

const ITEMS = 'items';

window.addEventListener('DOMContentLoaded', () => {
	const blob = window.localStorage.getItem(ITEMS);
	if (blob === null) {
		console.log('a');
		fetch('https://fakestoreapi.com/products')
			.then(response => response.json())
			.then(data => {
				window.localStorage.setItem(ITEMS, JSON.stringify(data));
				display(data);
			});
	} else {
		display(JSON.parse(blob));
	}
});

function display(blob) {
	for (const data of blob) {
		const item = document.createElement('product-item');
		item.update(data);
		product_list.appendChild(item);
	}
}
