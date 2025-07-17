import { Check, Copy, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

const App = () => {

  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopy(true);

    setTimeout(() => {

    })
  }

  return (
    <div className='min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center'>

      {/* Password generator box */}
      <div className='min-h-[500px] w-full rounded-xl  shadow-lg p-6 border border-yellow-400 mx-2'>

        <h1 className='text-center text-2xl text-yellow-300 font-semibold mb-6'>Classic Password Generator</h1>

        <div className='flex w-full items-center space-x-2 bg-gray-700 rounded-lg p-2 border-yellow-300 border'>

          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className='flex-1 bg-transparent outline-none text-xl w-1/2 md:w3/4 text-amber-300 font-semibold' />

          <div className='flex items-center space-x-2'>

            <button className='text-white' onClick={() => setVisible(true)}>{visible ? <Eye /> : <EyeOff />}</button>
            <button className='text-yellow-200' onClick={copyToClipboard()}>{copy ? <Check /> : <Copy />}</button>

          </div>
        </div>
      </div>

    </div>
  )
}
export default App
