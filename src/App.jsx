import React, { useState, useCallback, useEffect, useRef } from 'react'
import "./App.css"

const App = () => {
  
  const [len, setlen] = useState(6)
  const [numallowed, setnumallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)

  const [password, setpassword] = useState("")

  const genPassword= useCallback(
    () => {
      let string="QPWOEIRUTYLASKDJFHGMZNXBCVzmxncbvlaksjdhfgpqowieuryty"

      if(numallowed) string+="123456789"
      if(charallowed) string+="!@#$%^&*()"

      let genpass="";
      for(let i=0;i<len;i++){
        let index= Math.floor(Math.random() * string.length +1)
        genpass+=string[index]

      }

      setpassword(genpass)
    },
    [len,numallowed, charallowed, setpassword], //usecallback will call fnc when these 3 changes
  )

  useEffect(()=>{genPassword() },[len,numallowed, charallowed])

  const passRef=useRef(null)

  const copyfnc=()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
    alert("password copied")
    
  }



  
  


  return (
    <>
      <div className="main">
      <h1>Password Generator</h1>
      <div className="mbody">
        <input type="text" value={password} placeholder="enter password" readOnly ref={passRef} />
        <button onClick={copyfnc}>copy</button>
      </div>

      <div className="body2">
        <input type="range" name="" id="" min={6} max={100} value={len} onChange={(e)=>{
          setlen(e.target.value)
        }} />
        <label htmlFor="">Length ({len})</label>

        <input type="checkbox" defaultChecked={numallowed} name="" id="" onChange={()=> setnumallowed((prev)=> !prev)} />Numbers 
        <input type="checkbox" name="" defaultChecked={charallowed} id="" onChange={()=>{
          setcharallowed((prev)=> !prev)
        }} />Characters 
      </div>

      </div>
    </>
  )
}

export default App
