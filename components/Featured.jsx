import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Featured.module.css';
import { SlArrowRight } from 'react-icons/sl'
import { SlArrowLeft } from 'react-icons/sl'

export default function Featured() {
  const [index, setIndex] = useState(0);
  const images = [
    '/img/featured1.png',
    '/img/featured2.png',
    '/img/featured3.png',
  ];

  const handleArrow = (direction) => {
    if(direction === 'l'){
      setIndex(index !== 0 ? index - 1 : 2)
    }
    if(direction === 'r'){
      setIndex(index !== 2 ? index + 1 : 0)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{ left: 0, justifyContent: 'flex-start' }} onClick={() => handleArrow('l')}>
        <SlArrowLeft alt="" size={50} className='md:text-red-500' />
      </div>
      <div className={styles.wrapper} style={{ transform: `translateX(${-100*index}vw)` }}>
        {images.map((img, i) => (
          <div key={i} className={styles.imgContainer}>
            <Image src={img} alt="" fill className='object-cover' />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{ right: 0, justifyContent: 'flex-end' }} onClick={() => handleArrow('r')}>
        <SlArrowRight alt="" size={50} className='md:text-red-500' />
      </div>
    </div>
  );
}
