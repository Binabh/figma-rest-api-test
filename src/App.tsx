import { useState } from 'react';
import './App.css'
import { getAllFrames } from './services'

function App() {
  const [frames, setFrames] = useState([]);
  return (
    <>
      <button onClick={async () => {
        const allnodes = await getAllFrames();
        const frameUrls = allnodes.document.children[0].children.map((frame: any) => {
          return `https://www.figma.com/file/9DBL4iFXsGEMz8NTlTtBQw?embed_host=share&kind=file&node-id=${frame.id.replace(":", "-")}&t=OCqaLDLCxOZv47zD-1&viewer=1`
        });
        setFrames(frameUrls);
      }}>
        Get All frames
      </button>
      <div>
        {frames.map((frame, index) => (
          <iframe key={index} src={frame} width="800" height="600" />
        ))}
      </div>
    </>
  )
}

export default App
