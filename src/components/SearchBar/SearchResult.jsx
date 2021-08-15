import { useEffect, useState } from 'react';

// CSS
import '../../style/global.scss'
import './searchresult.css'

function SearchResult({ product }) {

  const [isLoading, setisLoading] = useState(false)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchSuggestionProducts();
  }, [product])

  const fetchSuggestionProducts = async () => {
    setisLoading(true)
    await fetch('https://winter-collection.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": "aMc4jWYYwe7HzGFVe8woZHAHB31kapbIc22DN4cLsukgr69OE2PQUkF0xDKovYk8"
      },
      body: JSON.stringify({
        query: `
          query GET_PRODUCT_BY_CAT($product: String!){
              products(where: {category: {_eq: $product}}) {
              category
              id
              price
              image_url
              alt_name
            }
          }
          `,
        variables: {
          product: product,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const { data } = result

        if (data.products) {
          setProducts(data.products)
        }
        setisLoading(false)
      })
      .catch(err => {
        console.error('error', err)
        setisLoading(false)
      })
  }


  return (
    <div className="search w-80">
      <div className="search-category col-4">
        <div className="pl-40">
          <h2 className="category-title">Categories</h2>
          <div>
            <p className="category-brand">Woman {'>'} Jacket</p>
            <ul className="category-list pl-30">
              <li>Zara</li>
              <li>Tifany</li>
              <li>C&C</li>
            </ul>
            <p className="category-brand mt-40">Man {'>'} Jacket</p>
            <ul className="category-list pl-30">
              <li>Kevingston</li>
              <li>Taberniti</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="search-result col-8">
        <div>
          <h2>Looking for {product} </h2>
          <p>Suggestion</p>
          <div className="image-result ">
            {isLoading ? <div>Loading</div> :
              products.length !== 0 ?
                <div className="flex">
                  {products.map((product, index) => (
                    <div key={product.id} className="flex flexColumn justifySpaceBtw pr-40">
                      <img className={`image-result-${++index}`} loading="lazy" src={product.image_url} alt={`Suggestion ${++index} - Jacket`} />
                      <p className="textCenter textUpper">{product.alt_name}</p>
                    </div>
                  ))}
                </div> :
                <div>Product not found</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResult
