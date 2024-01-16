import Head from "next/head"
import { canSSRAuth } from "../../../utils/canSSRAuth"
import styles from './styles.module.scss'
import { setupAPIClient } from "@/services/api"
import { useState, useContext, useEffect, use } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import avatarImg from '../../images/logo.jpeg'
import Image from "next/image"
import { LuEraser } from "react-icons/lu";
import { GiMoneyStack } from "react-icons/gi";
import Link from "next/link"
import { Cards } from "@/components/ui/Cards"
import {FiLogOut} from 'react-icons/fi'




type accountItemProps = {
    id: string,
    name: string,
    balance: number
}

interface accountProps{
    accountDetails: accountItemProps[];
}

type transactionsItemProps = {
    id: string,
    date: string,
    description: string,
    type: string,
    value: number,
    account_id: string
    category_id: string,
    account: accountItemProps,
    categories: categoriesItemProps
}

type categoriesItemProps = {
    id: string,
    name: string
}



interface transactionsProps {
    transactionsDetails: transactionsItemProps[];
}



export default function Dashboard({ accountDetails, transactionsDetails }: { accountDetails: accountProps, transactionsDetails: transactionsProps }){
    const {user, signOut} = useContext(AuthContext);

    const [saldoAtual, setSaldoAtual] = useState(0)
    const [saldoAtualCopia, setSaldoAtualCopia] = useState(0)
    const [saldoEntrada, setSaldoEntrada] = useState(0)

    const [refresh, setRefresh] = useState(false)

    const [transactions, setTransactions] = useState(transactionsDetails || [])
    
    const [accounts, setAccounts] = useState(accountDetails || []);
    const [accountSelected, setAccountSelected] = useState()

    

    useEffect(() => {
       function sumBalance(){
        var balanceSum = 0;
            for(var i = 0; i < accounts.length; i++){
                balanceSum = balanceSum + accounts[i].balance;
                
            }  
        setSaldoAtual(balanceSum) 
        setSaldoAtualCopia(balanceSum)    
       }

       function sumTransactionsEntrada(){
        var entradaSum = 0;
        for(var i = 0; i < transactions.length; i++){
            if(transactions[i].type == "Entrada"){
                entradaSum += transactions[i].value;
            }
        }
        setSaldoEntrada(entradaSum)
       }
       sumBalance();
       sumTransactionsEntrada();
    },[]);

    function handleChangeAccount(event: any){
        if(event.target.value == "allBalance"){
            setSaldoAtual(saldoAtualCopia)
            setAccountSelected(null)
        } else{
            setAccountSelected(event.target.value)

            handleFilter(event.target.value)
        }

        


    }

    function handleFilter(index: any){
        setSaldoAtual(accounts[index].balance)
    }
    
    

 
    return(
        <>
        <Head>
            <title>Finanças Web - Sua conta</title>
        </Head>
      
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div>
                    <Image className={styles.logoImg} src={avatarImg} alt="Foto do Usuario"/>
                </div>
                <div className={styles.sibedar_data}>
                    <div className={styles.sibedar_data_accounts}>
                        <h3>Conta</h3>
                        <select value={accountSelected} onChange={handleChangeAccount}>
                            <option value={"allBalance"}>Escolha o banco</option>
                            {accounts.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className={styles.sibedar_data_accounts_container}>
                            <div style={{backgroundColor: "#BF694E", width: 2, height: 100, marginTop: 30, borderRadius: 8}}></div>
                            <div className={styles.sibedar_data_accounts_titles}>
                                <div className={styles.sibedar_data_accounts_title}>
                                    <p style={{flex: 1}}>Contas</p>
                                    <p style={{flex: 1}}>Saldo</p>
                                </div>
                                <div className={styles.sibedar_data_accounts_data}>
                                {accounts.map((item, index) => {
                                    return(
                                        <div className={styles.sibedar_data_unique_account}>
                                            <p style={{flex: 1}}>{item.name}</p>
                                            <p style={{flex: 1}}>R$ {item.balance.toFixed(2)}</p>
                                        </div>
                                            
                                    )
                                })}
                                </div>
                            </div>
                    </div>
                    <div className={styles.sibedar_data_bottom}>
                        <h3>Periodo</h3>
                            <div>
                                <input type="date"/>
                                <input type="date"/>
                            </div>
                        <h3>Ano</h3>
                            <select>
                                <option>2023</option>
                                <option>2024</option>
                            </select>
                        <h3>Mês</h3>
                            <select>
                                <option>Janeiro</option>
                                <option>Fevereiro</option>
                                <option>Março</option>
                                <option>Abril</option>
                                <option>Junho</option>
                                <option>Julho</option>
                                <option>Agosto</option>
                                <option>Setembro</option>
                                <option>Outubro</option>
                                <option>Novembro</option>
                                <option>Dezembro</option>
                            </select>
                        <button className={styles.btFiltro}>Limpar Filtros <LuEraser size={22}/></button>  
                        <div className={styles.sidebar_options}>
                            <Link href="/transacao">Nova Transação</Link>
                            <Link href="/Banco">Novo Banco</Link>
                            <button onClick={signOut}>
                                <FiLogOut color='#585F73' size={22} />
                            </button> 
                        </div>
                    </div>
                </div>
            </aside>
            <div className={styles.content}>
                <div className={styles.components_titles}>
                    <div className={styles.component_saldoAtual}>
                        <div className={styles.component_saldoAtual_title}>
                            <h2>Saldo Atual</h2>
                            <GiMoneyStack size={45} color="#585F73"/>
                        </div>
                        <div>
                            <h1>R$ {saldoAtual.toFixed(2).replace('.', ',')}</h1>
                        </div>
                    </div>
                    <Cards title="Entradas" data={saldoEntrada} backgroundColor="#171C3A" icon="Entrada"/>
                    <Cards title="Despesas" data={77.55} backgroundColor="#171C3A" icon="Despesa"/>
                </div>
                
            </div>
                
                                
        </div>
        
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);

    const userDetail = await apiClient.get("/userDetail")

    const response = await apiClient.get('/accountDetails?user_id=' + userDetail.data.id)
    const response2 = await apiClient.get('/transactionsUser?user_id=' + userDetail.data.id)
    

    
    return {
          props:{
            accountDetails: response.data,
            transactionsDetails: response2.data
          }
    }
    
   
  })