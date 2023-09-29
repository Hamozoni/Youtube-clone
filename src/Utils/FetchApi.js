import axios from "axios";

export const fetchApi = async (url)=> {

    const { data } = await axios.get(`https://youtube-v3-alternative.p.rapidapi.com/${url}`,{
       headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
      }
    });

    return data;
};

export const fetchChannelApi = async (url)=> {

  const { data } = await axios.get(`https://yt-api.p.rapidapi.com/${url}`,{
    headers: {
      'X-RapidAPI-Key':  process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
  });
  return data;
 
};

export const fetchApiB = async (url)=> {

  const { data } = await axios.get(`https://youtube-v31.p.rapidapi.com/${url}`,{
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  });
  return data;
 
};
