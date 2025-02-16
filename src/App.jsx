import { useState } from 'react'

const themes = ["blue","yellow","green","purple","orange","red","black"]
const modes = ["light","dark"];
function App() {
  const [theme, setTheme] = useState(themes[0]);
  const [modeIndex, setModeIndex] = useState(0);
  return (
    <div className={`mode-${modes[modeIndex]} theme-${theme} bg-bg-primary min-h-screen`}>
    <div
        className="text-text-base hover:cursor-pointer p-4"
        onClick={() => setModeIndex(modeIndex === 0 ? 1 : 0)}
      >
        {modeIndex === 0 ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </div>
    <div className='flex w-96 justify-around'>{themes.map((t,index) => (
      <div key={index} className={`w-10 h-10 rounded-full bg-primary theme-${t} `} onClick={() => setTheme(t)}>
        
      </div>
    ))}</div>
    <div className=" min-h-96 text-text-base flex justify-center items-center ">
      <div className='bg-primary hover:bg-secondary px-4 py-2 rounded'>
        url shortener
      </div>
    </div>
    </div>
  )
}

export default App
