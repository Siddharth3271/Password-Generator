import { Check, Copy, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

const App = () => {
  // Function to generate random characters based on type
  const getRandomChar = {
    //generating random integer value from 0 to 26 and adding it to 65
    upper: () => String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    lower: () => String.fromCharCode(97 + Math.floor(Math.random() * 26)),
    number: () => String.fromCharCode(48 + Math.floor(Math.random() * 10)),
    symbol: () => String.fromCharCode(33 + Math.floor(Math.random() * 15))
  }

  // Function to calculate password strength
  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) {
      strength++;
    }
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (strength <= 1) return "Weak";
    if (strength === 2 || strength === 3) return "Moderate";
    return "Strong";
  }

  // Function to generate password
  const generatePassword = () => {
    let charTypes = [];

    if (upper) charTypes.push("upper");
    if (lower) charTypes.push("lower");
    if (number) charTypes.push("number");
    if (symbol) charTypes.push("symbol");

    if (charTypes.length === 0) {
      alert("Please select at least one character type");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      //[upper, lower, number, symbol]
      const type = charTypes[Math.floor(Math.random() * charTypes.length)]
      //type is one of the keys in getRandomChar
      password += getRandomChar[type]();
    }

    setPassword(password);
    setShow(true);
    setStrength(calculateStrength(password));
    setVisible(true);
  }

  // Function to handle password generation
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 2000)
  }

  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState(false);
  const [strength, setStrength] = useState("Weak");
  const [length, setLength] = useState(8);
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [show, setShow] = useState(false);

  // Main component render that includes the password generator UI
  return (
    <div className='min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center'>

      {/* Password generator box */}
      <div className='m-2 min-h-lg w-full max-w-xl rounded-xl  shadow-lg p-6 border border-yellow-400 mx-2'>

        <h1 className='text-center text-2xl text-yellow-300 font-semibold mb-6'>Classic Password Generator</h1>

        <div className='flex w-full items-center space-x-2 bg-gray-700 rounded-lg p-2 border-yellow-300 border'>

          <input type={visible ? "text" : "password"} value={password} readOnly onChange={(e) => setPassword(e.target.value)} className='flex-1 bg-transparent outline-none text-xl w-1/2 md:w3/4 text-amber-300 font-semibold' />

          {show ? <div className='flex items-center space-x-2'>

            <button className='text-white' onClick={() => setVisible(!visible)}>{visible ? <EyeOff /> : <Eye />}</button>
            <button className='text-yellow-200' onClick={copyToClipboard}>{copy ? <Check /> : <Copy />}</button>

          </div> : ""}
        </div>

        {/* Display password strength */}
        {password.length>0 && (<div className='mt-2 text-right text-sm font-bold text-yellow-300'>
          <label className='text-blue-400'>Strength:</label> <span className={strength === "Weak" ? 'text-red-400' : strength === "Moderate" ? "text-amber-300" : "text-green-400"}>{strength}</span>
        </div>)}

        // Checkbox options for character types
        <div className='grid grid-cols-2 gap-4 my-6 text-yellow-600'>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input type="checkbox" checked={upper} onChange={() => setUpper(!upper)} />UpperCase
          </label>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input type="checkbox" checked={lower} onChange={() => setLower(!lower)} />LowerCase
          </label>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input type="checkbox" checked={symbol} onChange={() => setSymbol(!symbol)} />Symbol
          </label>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input type="checkbox" checked={number} onChange={() => setNumber(!number)} />Number
          </label>
        </div>

        <div className='my-6'>
          <label className='block mb-1 font-semibold text-yellow-300'>
            <input type="number" value={length} min={4} max={20} onChange={(e) => setLength(e.target.value)} className='w-full p-2 rounded-lg border-2 border-yellow-400 bg-gray-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400' />
          </label>
        </div>

        <button onClick={generatePassword} className='w-full md:mt-8 mt-2 bg-blue-400 text-white font-bold py-2 rounded-lg shadow-md transition-all md:text-2xl text-xl hover:bg-blue-700 cursor-pointer'>Generate Password</button>

      </div>

    </div>
  )
}
export default App
