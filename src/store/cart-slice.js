import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	items: [],
	totalQuantity: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		addItem(state, action) {
			const newItem = action.payload;
			state.totalQuantity++;
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
	}
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;