import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	items: [],
	totalQuantity: 0,
	totalAmount: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		addItem(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find(item => item.id === newItem.id);
			if (!existingItem) {
				state.items.push({
					itemId: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title
				})
				return
			}
			existingItem.quantity++;
			existingItem.totalPrice += newItem.price;
		},
		removeItem(state, action) {
			const id = action.payload;
			const existingItem = state.items.find(item => item.id === id);
			if (existingItem.totalAmount > 1) {
				existingItem.totalAmount--;
				existingItem.totalPrice -= existingItem.price;
				return
			}
			state.items = state.items.filter(item => item.id !== id);
		},
	}
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;