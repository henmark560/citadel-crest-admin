import server from "../../server";
import { useEffect, useState } from 'react';
import { useNotification } from 'use-toast-notification'


const Kdb = () => {
  
    const [spinner, setSpinner] = useState(false)
    const [spinners, setSpinners] = useState(false)

  const [checker, setChecker] = useState(false)
  const [user, setUser] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')

  const [details, setDetails] = useState([])
  const [accounts, setAccounts] = useState([])

    
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const [freezed, setfreeze] = useState('')
const [freezedUser, setfreezedUser] = useState('')

const [unfreezed, unsetfreezed] = useState('')
const [unfreezedUser, unsetfreezedUser] = useState('')



const notification = useNotification()

    const data = {
        username: user, 
        amount: amount,
        date: date
    }


    async function getUsers(){
        const { data:response } = await server.get(`/users`);
        const details = JSON.parse(response.data);
        console.log(details)
        return details
    }


    

    async function getAccounts(){
        const { data:response } = await server.get(`/accounts`);
        const details = JSON.parse(response.data);
        console.log(details)
        return details
    }

    useEffect(()=>{
        async function output(){
            const res = await getUsers()
            setDetails(res)
            const sos = await getAccounts()
            setAccounts(sos)
        }output()
      },[checker])

  async function patch() {  
      const { data:response, status:status } = await server.post(`/update`,data)
      if (response) {
          notification.show({
              message: `${amount} was deposited successful `,
              title: 'Upload Succesful',
              variant: 'success'
          })
          console.log(status)
          return true;
        }else {
            notification.show({
                message: `${amount} could not be deposited`, 
                title: 'Upload failed',
                variant: 'error'
            })
            console.log(status)
            return false;

      }
    }
  
    async function patch_withdraw() {  
        const { data:response, status:status } = await server.post(`/debit`,data)
        if (response) {
            notification.show({
                message: `${amount} was deposited successful `,
                title: 'Upload Succesful',
                variant: 'success'
            })
            console.log(status)
            return true;
          }else {
              notification.show({
                  message: `${amount} could not be deposited`, 
                  title: 'Upload failed',
                  variant: 'error'
              })
              console.log(status)
              return false;
  
        }
      }
    
      // stop account from transfer
      async function freeze() {  
        const { data:response, status:status } = await server.post(`/hold`,{user:freezed})
        if (response) {
            notification.show({
                message: `Account has been frozen `,
                title: 'Freeze Succesful',
                variant: 'success'
            })
            console.log(status)
            return true;
          }else {
              notification.show({
                  message: `Account could not be frozen`, 
                  title: 'Upload failed',
                  variant: 'error'
              })
              console.log(status)
              return false;
  
        }
      }




      async function unfreeze() {  
        const { data:response, status:status } = await server.post(`/release`,{user:unfreezed})
        if (response) {
            notification.show({
                message: `Account has been frozen `,
                title: 'Freeze Succesful',
                variant: 'success'
            })
            console.log(status)
            return true;
          }else {
              notification.show({
                  message: `Account could not be frozen`, 
                  title: 'Upload failed',
                  variant: 'error'
              })
              console.log(status)
              return false;
  
        }
      }

        // stop account from login
      async function freeze_account() {  
        const { data:response, status:status } = await server.post(`/hold_account`,{user:freezedUser})
        if (response) {
            notification.show({
                message: `Account has been unfrozen`,
                title: 'Freeze Succesful',
                variant: 'success'
            })
            console.log(status)
            return true;
          }else {
              notification.show({
                  message: `Account could not be unfrozen`, 
                  title: 'Upload failed',
                  variant: 'error'
              })
              console.log(status)
              return false;
  
        }
      }

            // allow account from login
            async function unfreeze_account() {  
                const { data:response, status:status } = await server.post(`/release_account`,{user:unfreezedUser})
                if (response) {
                    notification.show({
                        message: `Account has been unfrozen `,
                        title: 'Freeze Succesful',
                        variant: 'success'
                    })
                    console.log(status)
                    return true;
                  }else {
                      notification.show({
                          message: `Account could not be unfrozen`, 
                          title: 'Upload failed',
                          variant: 'error'
                      })
                      console.log(status)
                      return false;
          
                }
              }



  async function login(username,password) {
      const { data: response } = await server.post("/root", {
          username: username,
          password:password
      })
      if(response){
          setChecker(true)
      } else {
          setSpinners(false)
      }
  }



  useEffect(()=>{
    async function output(){
    if(checker){
      document.getElementById('admin').style.display = 'block'
      document.getElementById('login').style.display='none'  
    }else{
      document.getElementById('admin').style.display = 'none'
      document.getElementById('login').style.display='block'  
    }} output()
  },[checker])
  
  return (
      <div>
         
<section className="bg-gray-50 dark:bg-gray-900" id="login">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Stantrust, we invest in the world’s potential</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Citadel we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
            <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more about our app 
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
        <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Admin dashboard
                </h2>
                <form className="mt-8 space-y-6" action="#">
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input  name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Admin" required/>
                    </div>
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required/>
                        </div>
                        <div className="ml-3 text-sm">
                        <label  className="font-medium text-gray-500 dark:text-gray-400">Remember this device</label>
                        </div>
                        < a href = "/insert" className="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lost Password?</a>

                </div>
                <button type="button" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async () => {
                  setSpinners(true)
                    await login(username,password)
                              }}>
                                {spinners ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Log in"
                        )}</button>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Not registered yet? <a className="text-blue-600 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
{/**-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
   
   
   
   
   
   
<div className="m-6" id="admin"> 
    <div>
        <p className="text-3xl text-center mb-6 font-mono font-bold">Clients</p> 
    </div>  

    <ul>
              {details.map((element,item)=>(
                
                <li key={item} className="mb-6 flex  " > 
                <div className="max-w-sm rounded flex-auto overflow-hidden shadow-lg bg-white">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{element.username}</div>
                  {/* <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                  </p> */}
                </div>
                <div className="px-6 py-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{element.email}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{element.mobile}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{element.acc_num}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{element.first_name}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{element.last_name}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{element.country}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{element.address}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Password: {element.password}</span>
                </div>
              </div>
                  {/* <p href=''>Username: {element.username}</p>
                  <p href=''>Email: {element.email}</p>
                  <p href=''>Number: {element.mobile}</p>
                  <p href=''>Account: {element.acc_num}</p>
                  <p href=''>country: {element.country}</p> */}

                </li>
              ))}

    </ul>
{/**-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


    <div>
        <p className="text-3xl text-center mb-6 font-mono font-bold">Accounts</p> 
    </div>  

    <ul>
              {accounts.map((element,item)=>(
                
                <li key={item} className="mb-6 flex  " > 
                <div className="max-w-sm rounded flex-auto overflow-hidden shadow-lg bg-white">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{element.username}</div>
                  {/* <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                  </p> */}
                </div>
                <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"> acc:{element.account}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">bal: {element.balance}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">deposit: {element.deposits}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">withdrawals: {element.withdrawals}</span>
                  {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{element.fdr}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{element.dps}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{element.loans}</span> */}

                </div>
              </div>
                 

                </li>
              ))}

    </ul>










{/**----------------------------------------------------------------------------Deposit Amount and Withdraw Amount---------------------------------------------------------------------------------------------------------------------------------------------------------- */}


<div>
    <p className="text-3xl text-center mb-6 font-mono font-bold">Deposit Amount</p>
</div>   
<form>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
              <input type="text" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Stanzee" required value={user} onChange={(e) => setUser(e.target.value)} />
        </div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount:</label>
            <input type="text" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jane Doe" required value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
            <input type="text" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12/03/2023" required value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async () => {
                    setSpinner(true)                      
                    await patch() &&
                        setSpinner(false)
                        console.log("clicked")           
                  }}>
                      {spinner ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Deposit"
                        )}</button>

<button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async () => {
                    setSpinner(true)                      
                    await patch_withdraw() &&
                        setSpinner(false)
                        console.log("clicked")           
                  }}>
                      {spinner ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Withdraw"
                        )}</button>

    </div>
</form>







{/* -------------------------------------------------------------------------------------  Freeze Accounts   ----------------------------------------------------------------------------------------------    */}
<div>
    <p className="text-3xl text-center mb-6 font-mono font-bold">Freeze Account From Transfer</p>
</div>   
<form>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
              <input type="text" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Stanzee" required value={freezed} onChange={(e) => setfreeze(e.target.value)} />
        </div>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async () => {
                    setSpinner(true)                      
                    await freeze() &&
                        setSpinner(false)
                        console.log("clicked")           
                  }}>
                      {spinner ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Freeze from Transfer"
        )}</button>

    </div>
</form>




{/* -------------------------------------------------------------------------------------  unFreeze Accounts   ----------------------------------------------------------------------------------------------    */}
<div>
    <p className="text-3xl text-center mb-6 font-mono font-bold">UnFreeze Account From Transfer</p>
</div>   
<form>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
              <input type="text" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Stanzee" required value={unfreezed} onChange={(e) => unsetfreezed(e.target.value)} />
        </div>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async () => {
                    setSpinner(true)                      
                    await unfreeze() &&
                        setSpinner(false)
                        console.log("clicked")           
                  }}>
                      {spinner ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "unFreeze from Transfer"
        )}</button>

    </div>
</form>







{/* -------------------------------------------------------------------------------------  Freeze Accounts from Login   ----------------------------------------------------------------------------------------------    */}
<div>
    <p className="text-3xl text-center mb-6 font-mono font-bold"> Restrict Account From Login</p>
</div>   
<form>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
              <input type="text" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Stanzee" required value={freezedUser} onChange={(e) => setfreezedUser(e.target.value)} />
        </div>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async () => {
                    setSpinner(true)                      
                    await freeze_account() &&
                        setSpinner(false)
                        console.log("clicked")           
                  }}>
                      {spinner ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Restrict from Login"
        )}</button>

    </div>
</form>







{/* -------------------------------------------------------------------------------------  unFreeze Accounts from Login   ----------------------------------------------------------------------------------------------    */}
<div>
    <p className="text-3xl text-center mb-6 font-mono font-bold">UnRestrict Account From Login</p>
</div>   
<form>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
              <input type="text" id="user" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Stanzee" required value={unfreezedUser} onChange={(e) => unsetfreezedUser(e.target.value)} />
        </div>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async () => {
                    setSpinner(true)                      
                    await unfreeze_account() &&
                        setSpinner(false)
                        console.log("clicked")           
                  }}>
                      {spinner ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Unrestrict from Login"
        )}</button>

    </div>
</form>




</div>  
   









































</div>   
  )
}

export default Kdb
