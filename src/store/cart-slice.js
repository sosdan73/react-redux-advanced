import {createSlice} from "@reduxjs/toolkit";
import {uiActions} from "./ui-slice";

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
});

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(uiActions.showNotification({
			status: 'pending',
			title: 'Sending...',
			message: 'Sending cart data',
		}))

		const sendRequest = async () => {
			const response = await fetch(
				'https://react-redux-99c7d-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
					method: 'PUT',
					body: JSON.stringify(cart),
				});
			if (!response.ok) {
				throw new Error('Sending cart data failed')
			}
			return response
		}

		try {
			await sendRequest();
			dispatch(uiActions.showNotification({
				status: 'success',
				title: 'Success...',
				message: 'Sent data successfully',
			}))
		} catch (error) {
			dispatch(uiActions.showNotification({
				status: 'error',
				title: 'Error!',
				message: 'Sending cart data failed',
			}))
		}

	}
}
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;