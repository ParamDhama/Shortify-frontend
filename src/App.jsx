import { useState } from 'react'

const themes = ["blue","yellow","purple","orange","red"]
const modes = ["light","dark"];
const fonts = ["inter","roboto","poppins","lato","nunito"];
function App() {
  const [theme, setTheme] = useState(themes[0]);
  const [modeIndex, setModeIndex] = useState(0);
  const [font,setFonts] = useState(fonts[0]);
  return (
    <div className={`mode-${modes[modeIndex]} theme-${theme} bg-bg-primary min-h-screen font-inter font-${font}`}>
      <div className='w-full flex justify-around'>
        {fonts.map((ft,index) => (
          <div className={`font-${ft} font-body font-bold text-2xl px-4 py-2 text-text-base bg-bg-primary`} onClick={() => setFonts(ft)} key={index}>
            {ft}
          </div>
        ))}
      </div>
    <div
        className="text-text-base hover:cursor-pointer p-4"
        onClick={() => setModeIndex(modeIndex === 0 ? 1 : 0)}
      >
        {modeIndex === 0 ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </div>
    <div className='flex w-96 justify-around'>{themes.map((t,index) => (
      <div key={index} className={`w-10 h-10 rounded-full hover:cursor-pointer bg-primary theme-${t} `} onClick={() => setTheme(t)}>
        
      </div>
    ))}</div>
    <div className=" min-h-96 text-text-base flex justify-center items-center ">
      <div className='bg-primary hover:bg-secondary px-4 py-2 rounded font-body'>
        url shortener
      </div>
    </div>
    </div>
  )
}

export default App
