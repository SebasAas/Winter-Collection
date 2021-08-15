import { useRef, useEffect } from 'react'
import { gsap } from 'gsap';

// Styles
import '../style/global.scss'
import '../assets/style/home.scss'
import image1 from '../assets/image/collection-2.jpg'
import image2 from '../assets/image/collection-1.jpg'

export default function Home() {
  const titleStrongRef = useRef(null);
  const titleRef = useRef(null);
  const imageMediumRef = useRef(null);
  const imageHighRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({})
    tl.fromTo('.navRef', { y: 50 }, { y: 0, opacity: 1, duration: 1, ease: "power3.inOut" })
    tl.fromTo(titleStrongRef.current, { y: 50 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.inOut" })
    tl.fromTo(titleRef.current, { y: 50 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.inOut" })
    tl.to(imageMediumRef.current, { x: 0, opacity: 1, duration: 0.8, ease: "power3.inOut" })
    tl.to(imageHighRef.current, { x: 0, opacity: 1, duration: 0.8, ease: "power3.inOut" }, "<")
    tl.to(buttonRef.current, { opacity: 1, duration: 1, ease: "power3.inOut" })
  }, [])

  return (
    <section className="flex home container">
      <div className="w-100 flex flexColumn home-left alignCenter pb-20">
        <h1 className="flex flexColumn home-desc">
          <span ref={titleStrongRef} className="title-strong">Winter</span>
          <span ref={titleRef} className="title textEnd">Collection</span>
        </h1>
        <img ref={imageMediumRef} className="image-1" loading="lazy" src={image1} alt="Collection Winter Edition 1" />
        <button ref={buttonRef}>Shop the offer</button>
      </div>
      <div className="w-100 flex justifyCenter home-right hide-md">
        <div>
          <img ref={imageHighRef} className="image-2" loading="lazy" src={image2} alt="Collection Winter Edition 2" />
        </div>
      </div>
    </section>
  )
}