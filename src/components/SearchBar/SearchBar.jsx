import { useState, useEffect } from 'react'
import { gsap } from 'gsap';

// Components
import SearchResult from './SearchResult';

// CSS
import './searchbar.css';

export default function SearchBar() {
  const [canFetchData, setCanFetchData] = useState(false)
  const [product, setProduct] = useState('');

  useEffect(() => {
    if (product.length >= 3) {
      setCanFetchData(true)
    }
  }, [product])

  const animateOpenSearch = () => {
    document.getElementsByClassName('searchbox')[0].focus()
    gsap.to('.searchbox', { duration: 0.7, width: "300", paddingLeft: 30, ease: "expo.out" })
  }

  const animateCloseSearch = () => {
    if (product.length > 0) return;

    setCanFetchData(false)
    gsap.to('.searchbox', { duration: 0.7, width: 40, paddingLeft: 0, ease: "expo.out" })
  }

  return (
    <>
      <div onBlur={() => animateCloseSearch()} onClick={() => animateOpenSearch()} className="searchbar">
        <label htmlFor="searchbox" className="search-icon">
          <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.2702 29.2492L19.8407 18.1468L19.9509 18.0233C21.9337 16.1076 23.1455 13.5123 23.1455 10.6286C23.1455 4.75814 18.0562 0 11.7552 0C5.47621 0 0.386932 4.75814 0.386932 10.6286C0.386932 16.499 5.47621 21.2571 11.7552 21.2571C14.0685 21.2571 16.2276 20.6186 18.0342 19.4857L27.4636 30.5674C27.8602 31.0412 28.5872 31.103 29.094 30.7322C29.6007 30.3615 29.6668 29.7229 29.2702 29.2492ZM11.645 19.0532C6.68794 19.0532 2.67821 15.3043 2.67821 10.6698C2.67821 6.03522 6.68794 2.28638 11.645 2.28638C16.6021 2.28638 20.6118 6.03522 20.6118 10.6698C20.5898 15.3043 16.5801 19.0532 11.645 19.0532Z" fill="black" />
          </svg>
        </label>
        <input className="searchbox" onChange={(e) => setProduct(e.target.value)}></input>
      </div>
      {
        console.log(canFetchData),
        canFetchData && <SearchResult product={product} />
      }
    </>
  )
}