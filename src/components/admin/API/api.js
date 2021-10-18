import { HTTP_REQUEST } from "./util";

const base_url = 'http://127.0.0.1:3040';


export const KernelAPI = {
  async getKernel(){
    try{
      const response = await fetch(`${base_url}/resource/kernel`)
      return response.json();
    }catch(e){
      console.log(e)
    } 
  },
  async postKernel(pair){
    try{
      return await fetch(`${base_url}/resource/kernel`, HTTP_REQUEST.POST(pair));
    }catch(e){
      console.log(e);
    }
  }
}
