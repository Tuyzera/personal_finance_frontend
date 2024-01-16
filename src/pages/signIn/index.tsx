import Head from 'next/head'
import Image from 'next/image'
import styles from './styles.module.scss'
import {useContext, FormEvent, useState} from 'react'
import { FcMoneyTransfer } from "react-icons/fc";





import { cannSRRGuest } from '@/utils/canSSRguest'

import { AuthContext } from '@/contexts/AuthContext'

import {FaSpinner} from 'react-icons/fa'
import Link from 'next/link'


export default function SignIn() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)


  async function handleLogin(event: FormEvent){
    event.preventDefault()
    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data);
    setLoading(false)
  }

  
  return (
    //Em volta disso <><Head> </Head></>, e passando a proprieadade "title", a gente muda o titulo da nossa aba
   <>
    <Head>
      <title>Financas Web - Faça seu login</title> 
    </Head>
      <div className={styles.container}>
        <div className={styles.inner}>
          <FcMoneyTransfer size={275} />

          <form className={styles.form} onSubmit={handleLogin}>
            <input type='text' placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type='password' placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)}></input>

            {!loading ?(
              <button type='submit'  disabled={loading}><a>Acessar</a></button>
            ) : (
              <button type='submit'><FaSpinner size={25} color="#FFF"/></button>
            )}

              <Link className={styles.linkCadastrar} href={'/signUp'}>Não possui uma conta? Cadastre-se aqui</Link>
          </form>
        </div>
          
      </div>
   </>
  )
}


export const getServerSideProps = cannSRRGuest(async (ctx) => {
  return {
        props:{}
  }
  
})