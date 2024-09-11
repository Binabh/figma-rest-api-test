import { useState } from 'react';
import './App.css'
import { getAllFrameImages, getSVGFromURL, getTranslatedTextsForProject } from './services'

function App() {
  const [frames, setFrames] = useState<string[]>([]);
  return (
    <>
      <button onClick={async () => {
        const allnodes = await getAllFrameImages();
        Object.keys(allnodes).forEach(async (key) => {
          const imageUrl = allnodes[key];
          const svg = await getSVGFromURL(imageUrl);
          setFrames((prev) => [...prev, svg]);
        });
      }}>
        Get All frames
      </button>
      {frames.length > 0 && <button onClick={async () => {
        const translations = await getTranslatedTextsForProject(10);
        const translatedFrames = frames.map((frame) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(frame, 'image/svg+xml');
          const texts = doc.querySelectorAll('text');
          texts.forEach((text) => {
            const textArray: string[] = [];
            const tspans = text.querySelectorAll('tspan');
            tspans.forEach((tspan) => {
              textArray.push(tspan.textContent ?? "");
            });
            const textId = text.getAttribute("data-node-id");
            
            
            const transtatedText = translations.data.find((t:any)=>t.fieldId == textId).translatedText;
            console.log(transtatedText);
            
            const chunkSize = Math.ceil(transtatedText.length / tspans.length);
            const matchText = new RegExp(`.{1,${chunkSize}}(\\s|$)|\\S+`, 'g');
            console.log(chunkSize);
            
            const translatedArray = transtatedText.match(matchText) ?? [];
            console.log(translatedArray);
            
            tspans.forEach((tspan, index) => {
              tspan.textContent = translatedArray[index];
            });
          });
          return doc.documentElement.outerHTML;
        });
        // console.log(translatedFrames);

        setFrames(translatedFrames);
      }}>Toggle Language</button>}
      <div>
        {frames.map((frame, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: frame }} />
        ))}
      </div>
    </>
  )
}

export default App
