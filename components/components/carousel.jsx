import { useState } from "react";
import styles from "./carousel.module.sass";

export default function Carousel() {
    const items = ['Item A', 'Item B', 'Item C', 'Item D']
    // const items = ['Item A', 'Item B', 'Item C']
    const itemIndices = items.map((val, index) => 0.5+ index - items.length/2)
    const [pos, setPos] = useState(0)

    const moveLeft = () => {
        if (pos === 0) {
            setPos(items.length)
        }
        else {
            setPos(pos-1)
        }
    }

    const moveRight = () => {
        if (pos === items.length-1) {
            setPos(0)
        }
        else {
            setPos(pos+1)
        }
    }
    const WIDTH = 250
    const itemsContainerStyle = {
        left: `${-itemIndices[pos]*WIDTH}px`
    }

    return (
        <div className={styles.carousel}>
        <button onClick={moveLeft}>left</button>
        <div className={styles.container}>
            <div className={styles.itemsContainer} style={itemsContainerStyle}>
                {items.map((item, index) => {
                    return <CarouselItem 
                        title={item}
                        width={WIDTH}
                    />
                })}
            </div>
        </div>
        <button onClick={moveRight}>right</button>
    </div>)
}

function CarouselItem({title, width}) {
    const MARGIN = 5
    const style = {
        width: `${width-2*MARGIN}px`,
        margin: `${MARGIN}px`
    }
    return (<div className={styles.item} style={style}>
        <span className={styles.header}>{title}</span>
    </div>)
}


