import { Component } from 'react';
import styles from './styles.module.scss'
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";


interface CardsProps{
    data: number,
    title: string
    backgroundColor: string,
    icon: string
}

export function Cards({title, data, backgroundColor, icon, ...rest}: CardsProps){
    return(
        <div className={styles.component_entrada}  style={{backgroundColor: backgroundColor}}>
                        <div className={styles.component_entrada_title}>
                            <h2>{title}</h2>
                            {icon == "Entrada" ? <HiArrowTrendingUp size={45} color="#585F73"/> : <HiArrowTrendingDown size={45} color="#585F73"/>}
                        </div>
                        <div>
                            <h1>R$ {data.toFixed(2)}</h1>
                        </div>
                    </div>
    )
}