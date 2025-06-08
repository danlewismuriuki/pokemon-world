import React from "react";
import styles from '@/components/card.module.css';

function Card({imageUrl, title, onClick}) {
    return (
        <div className={styles.card}  onClick={onClick}>
            <img className={styles.image} src={imageUrl} alt={title}></img>
            <h3 className={styles.title}>{title}</h3>
        </div>
    )
}

export default Card;