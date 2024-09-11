import axios from "axios";


const API = axios.create({
  baseURL: "https://api.figma.com/v1/",
  headers: {
    "Content-Type": "application/json",
    "X-Figma-Token": import.meta.env.VITE_FIGMA_TOKEN,
  },
});
export const TRANSLATION_API = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    "Content-Type": "application/json",
    "token-FTP":import.meta.env.VITE_API_TOKEN as string
  }
})
export const getAllFrameImages = async () => {
  const nodes = await API.get(`files/${import.meta.env.VITE_FIGMA_FILE}`);
  const frameIds = nodes.data.document.children[0].children.map((frame: any) => {
    return frame.id;
  });
  const response = await API.get(`images/${import.meta.env.VITE_FIGMA_FILE}?ids=${frameIds.join(",")}&format=svg&svg_outline_text=false&svg_include_node_id=true`);
  console.log(response.data);
  return response.data.images;
};
export const getSVGFromURL = async (url: string) => {
  const response = await fetch(url);
  return response.text();
};
 export const getTranslatedTextsForProject = async (projectId: number) => {
  const response = await TRANSLATION_API.get(`/translate`,{
    params: {
      projectId
    }
  });
  return response.data;
};
