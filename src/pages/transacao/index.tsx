import Head from 'next/head'
import styles from './styles.module.scss'
import Header from '@/components/ui/Header'
import { Input } from '@/components/ui/Input'


export default function Transacao(){
    return(
        <div>
            <>
            <Head>
                <title>Finanças Web - Nova Transação</title>
            </Head>
            <div>
                <Header/>
                <div className={styles.forms}>
                    Data: <Input placeholder='Digite a data'></Input>
                    Descrição: <Input placeholder='Diigte a Descrição'></Input>
                    Valor: <Input placeholder='Diigte o Valor'></Input>
                    <button>Registrar Transação</button>
                </div>
            </div>
            </>
        </div>
    )
}
