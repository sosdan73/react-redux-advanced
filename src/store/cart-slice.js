import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	items: [],
	totalQuantity: 0,
	changed: false,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		addItem(state, action) {
			state.totalQuantity++;
			state.changed = true;
			const newItem = action.payload;
			const existingItem = state.items.find(item => item.id === newItem.id);
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					quantity: 1,
					price: newItem.price,
					totalPrice: newItem.price,
					name: newItem.title
				})
				return
			}
			existingItem.quantity++;
			existingItem.totalPrice += existingItem.price;
		},
		removeItem(state, action) {
			state.changed = true;
			const id = action.payload;
			const existingItem = state.items.find(item => item.id === id);
			state.totalQuantity--;
			if (existingItem.quantity > 1) {
				existingItem.quantity--;
				existingItem.totalPrice -= existingItem.price;
				return
			}
			state.items = state.items.filter(item => item.id !== id);
		},
		replaceCart(state, action) {
			state.items = action.payload.items;
			state.totalQuantity = action.payload.totalQuantity;
		}
	}
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;