import ProductItem from '../Items/ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
	{
		id: 'p1',
		price: 6,
		title: 'Crime and punishment',
		description: 'Fedor Dostoevskiy\'s well known book'
	},
	{
		id: 'p2',
		price: 5,
		title: 'Second book',
		description: 'Not as good as the first one'
	},
]

const Products = (props) => {
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{DUMMY_PRODUCTS.map(product => (
					<ProductItem
						key={product.id}
						id={product.id}
						title={product.title}
						price={product.price}
						description={product.description}
					/>
				))}
			</ul>
		</section>
	);
};

export default Products;
