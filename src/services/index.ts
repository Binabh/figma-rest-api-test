import axios from "axios";


const API = axios.create({
  baseURL: "https://api.figma.com/v1/",
  headers: {
    "Content-Type": "application/json",
    "X-Figma-Token" :import.meta.env.VITE_FIGMA_TOKEN,
  },
});

export const getAllFrames = async () => {
  const response = await API.get('files/9DBL4iFXsGEMz8NTlTtBQw');
  console.log(response.data);
  return response.data;
  
};
