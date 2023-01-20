import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products/Products';
import {useSelector} from "react-redux";
import {useEffect} from "react";

function App() {
	const showCart = useSelector(state => state.ui.cartIsVisible);
	const cart = useSelector(state => state.cart);

	useEffect(() => {
		fetch(
			'https://react-redux-99c7d-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
			method: 'PUT',
			body: JSON.stringify(cart),
		})
	}, [cart])

	return (
		<Layout>
			{showCart && <Cart/>}
			<Products />
		</Layout>
	);
}

export default App;
