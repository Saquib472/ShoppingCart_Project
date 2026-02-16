import { useSelector } from 'react-redux'
import Product from '../components/Product'
import { getAllProductError, getAllProductLoading, getAllProducts } from '../store/slices/productsReducer'

export default function Home() {
  const productList = useSelector(getAllProducts)
  const productLoading = useSelector(getAllProductLoading)
  const productError = useSelector(getAllProductError)
  return productLoading ? (<h1 style={{'textAlign': 'center'}}>Loading.........</h1>) : productError ? (<h1 style={{'textAlign': 'center'}}>{productError}</h1>) : (
    <div className="products-container">
      {productList.map(({ id, title, rating, price, image }) => (
        <Product
          key={id}
          id={id}
          title={title}
          rating={rating.rate}
          price={price}
          imageUrl={image}
        />
      ))}
    </div>
  )
}
