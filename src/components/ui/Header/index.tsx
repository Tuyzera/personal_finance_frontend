import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logoImg from '../../../images/Moeda.svg'
import {FiLogOut} from 'react-icons/fi'
import { AuthContext, signOut } from '@/contexts/AuthContext'
import {useContext} from 'react'

export default function Header(){

    const {signOut} = useContext(AuthContext)


    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerInner}>
                <nav className={styles.headerInnerRight}>
                    <Link href={'/transacao'}>Nova transação</Link>
                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24} />
                    </button>                      
                </nav>
            </div>
        </header>
    )
}