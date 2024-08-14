
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTVUWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%^&*(){}[]_+"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed])

  const passwordCopy = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,10);
    //document.execCommand("copy"); or 
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator]);

  return (
    <>
      <form>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="text" className="form-control" id="exampleInputPassword1" value={password} ref={passwordRef}/>
        </div>

        <input type="range" className="range" min="8" max="30" id="customRange2"
        onChange={(e) => {setLength(e.target.value)}}></input>
        <label htmlFor="customRange2" className="form-label">Length: {length}</label>
        <div className="mb-3 form-check">

          <input type="checkbox" className="form-check-input" id="exampleCheck1" defaultChecked={numberAllowed}
          onChange={() => {setNumberAllowed((prev) => !prev)}} />
          <label className="form-check-label" htmlFor="exampleCheck1">NumberAlloowed</label>
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck2" defaultChecked={charAllowed}
          onChange={() => {setCharAllowed((prev)=>!prev)}} />
          <label className="form-check-label2" htmlFor="exampleCheck2">CharacterAllowed</label>
        </div>

        <button className="btn btn-primary" onClick={passwordCopy}>Copy</button>
      </form>


    </>
  )
}

export default App
