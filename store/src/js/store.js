import { writable } from "svelte/store";
import { v4 } from "uuid";

export const serverAction = (route, data) => {
	return fetch(route, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

export const colorTheme = writable(null);
export const drawerOpen = writable(true);
export const cartPrices = writable([]);
export const cartItems = writable([]);
export const sortSelection = writable("");
export const userRating = writable(0);
export const user = writable({});
export const snacks = writable([]);
export const currentStep = writable("Cart");
export const paymentMethod = writable("Credit card");
export const cookieConsent = writable(false);
export const currentDeliveryPoint = writable({
	name: "Mwenge Street, Dar es Salaam",
	latitude: -6.7797,
	longitude: 39.2296,
});
export const filters = writable({
	categorySelection: "",
	reviewSelection: "",
	sortSelection: "",
	categories: ["Phones", "Laptops", "Headsets", "Computers", "Peripherals", "Networking"],
	reviews: [4, 3.5, 2],
	sorts: ["Recently added", "Price:Low to High", "Price:High to Low", "Top rated"],
	urlParams: { "Recently added": "tdsc", "Price:Low to High": "pasc", "Price:High to Low": "pdsc", "Top rated": "rdsc" },
	updateFilters,
});
export const explanations = writable({
	not_an_email: `It is not a valid email address`,
	pattern: `password must have least one lowercase letter, one uppercase letter, one digit, and one special character`,
	min: "Value is too short",
	passwords_not_match: "passwords do not match",
});
function updateFilters(property, value) {
	filters.update((queryFilters) => {
		queryFilters[property] = value;
		return queryFilters;
	});
}

export const updateSnacks = (snack, operation, item) => {
	snacks.update((snacksScafold) => {
		if (operation == "remove") {
			const index = snacksScafold.indexOf(snack);
			// console.log(index,snacksScafold);
			snacksScafold.splice(index, index + 1);
			return snacksScafold;
		} else {
			snacksScafold.push({
				action: item,
				uid: v4(),
			});
			return snacksScafold;
		}
	});
};

function decimalAdjust(type, value, exp) {
	type = String(type);
	if (!["round", "floor", "ceil"].includes(type)) {
		throw new TypeError("The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'.");
	}
	exp = Number(exp);
	value = Number(value);
	if (exp % 1 !== 0 || Number.isNaN(value)) {
		return NaN;
	} else if (exp === 0) {
		return Math[type](value);
	}
	const [magnitude, exponent = 0] = value.toString().split("e");
	const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
	// Shift back
	const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
	return Number(`${newMagnitude}e${+newExponent + exp}`);
}

export const round = (value, exp) => decimalAdjust("round", value, exp);
