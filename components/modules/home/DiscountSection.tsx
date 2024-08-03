'use client'
import { MouseEvent, useRef, useState } from 'react'
import styles from './DiscountSection.module.css'
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { VariantsProp } from '@/components/templates/Home';
import {motion, Variants} from 'framer-motion'

function DiscountSection() {

    const cardVariants:Variants = {
        offscreen:{
          x:200 ,
          opacity:0
        },
        onscreen:{
          opacity:1,
          x:0,
          transition:{
            duration:0.4
          }
        }
      }

    const itemref = useRef<HTMLDivElement | null>(null)
    const [mouseDown , setMouseDown] = useState(false)
    const[startPosition , setStartPosition] = useState(0)
    const [scrollStyle, setScrollStyle] = useState<Record<string, string>>({});
    const [scrollLeft , setScrollLeft] = useState<number|undefined>(0)
   const startHandler = (e:MouseEvent)=>{
        setMouseDown(true)
        setStartPosition(e.clientX)
        setScrollLeft(itemref.current?.scrollLeft)
    }

    const moveHandler = (e:MouseEvent)=>{
        if(!mouseDown) return 
        e.preventDefault()
        setScrollStyle({
            '--scaleUp':'1.05',
            '--boxShadow':"inset 0px 0px 10px gold",
        })
        const walk = (e.pageX - startPosition)
        itemref.current ? itemref.current.scrollLeft = ((scrollLeft ?? 0) - walk) :null
    }

    const endHandler = ()=>{
        setMouseDown(false)
        setScrollStyle({})
    }

  return (
    <motion.div 
     initial='offscreen'
     whileInView='onscreen' 
     variants={cardVariants}
    style={{ perspective:'2000px'}}>
        <div 
        ref={itemref}
        onMouseDown={startHandler}
        onMouseMove={moveHandler}
        onMouseLeave={endHandler}
        onMouseUp={endHandler}
        style={scrollStyle}
        className={styles.container}>
            <div style={{paddingLeft:'20px'}} className={styles.phoneSeeAll}>
                 <p>مشاهده ی همه شگفت انگیز ها</p>
                    <FaCircleArrowLeft />
            </div>
        {
            [...Array(10)].map((item, index)=>
                 <div key={index} className={styles.card}>
                        <img src='homepage/nobgPerfume2.png' />
                        <span>توضیحات محصول</span>
                </div>
            )
        }
            <div style={{paddingRight:'20px'}} className={styles.phoneSeeAll}>
                 <p>مشاهده ی همه شگفت انگیز ها</p>
                    <FaCircleArrowRight />
            </div>
        </div>

    </motion.div>

  )
}

export default DiscountSection