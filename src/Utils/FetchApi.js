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
    },
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



// export const fetchApi1 = async (url)=> {

//   const { data } = await axios.get(`https://youtube-v3-alternative.p.rapidapi.com/${url}`,{
//      headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY2,
//     'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
//     }
//   });

//   return data;
// };

// export const fetchChannelApi1 = async (url)=> {

// const { data } = await axios.get(`https://yt-api.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key':  process.env.REACT_APP_API_KEY2,
//     'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
//   }
// });
// return data;

// };

// export const fetchApiB_1 = async (url)=> {

// const { data } = await axios.get(`https://youtube-v31.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY2,
//     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
//   }
// });
// return data;

// };


// export const fetchApi2 = async (url)=> {

//   const { data } = await axios.get(`https://youtube-v3-alternative.p.rapidapi.com/${url}`,{
//      headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY3,
//     'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
//     }
//   });

//   return data;
// };

// export const fetchChannelApi2 = async (url)=> {

// const { data } = await axios.get(`https://yt-api.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key':  process.env.REACT_APP_API_KEY3,
//     'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
//   }
// });
// return data;

// };

// export const fetchApiB2 = async (url)=> {

// const { data } = await axios.get(`https://youtube-v31.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY3,
//     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
//   }
// });
// return data;

// };


// export const fetchApi3 = async (url)=> {

//   const { data } = await axios.get(`https://youtube-v3-alternative.p.rapidapi.com/${url}`,{
//      headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY4,
//     'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
//     }
//   });

//   return data;
// };

// export const fetchChannelApi3 = async (url)=> {

// const { data } = await axios.get(`https://yt-api.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key':  process.env.REACT_APP_API_KEY4,
//     'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
//   }
// });
// return data;

// };

// export const fetchApiB3 = async (url)=> {

// const { data } = await axios.get(`https://youtube-v31.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY4,
//     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
//   }
// });
// return data;

// };


// export const fetchApi4 = async (url)=> {

//   const { data } = await axios.get(`https://youtube-v3-alternative.p.rapidapi.com/${url}`,{
//      headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY5,
//     'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
//     }
//   });

//   return data;
// };

// export const fetchChannelApi4 = async (url)=> {

// const { data } = await axios.get(`https://yt-api.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key':  process.env.REACT_APP_API_KEY5,
//     'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
//   }
// });
// return data;

// };

// export const fetchApiB4 = async (url)=> {

// const { data } = await axios.get(`https://youtube-v31.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY5,
//     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
//   }
// });
// return data;

// };



// export const fetchApi5 = async (url)=> {

//   const { data } = await axios.get(`https://youtube-v3-alternative.p.rapidapi.com/${url}`,{
//      headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY6,
//     'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
//     }
//   });

//   return data;
// };

// export const fetchChannelApi5 = async (url)=> {

// const { data } = await axios.get(`https://yt-api.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key':  process.env.REACT_APP_API_KEY6,
//     'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
//   }
// });
// return data;

// };

// export const fetchApiB_5 = async (url)=> {

// const { data } = await axios.get(`https://youtube-v31.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY6,
//     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
//   }
// });
// return data;

// };



// export const fetchApi6= async (url)=> {

//   const { data } = await axios.get(`https://youtube-v3-alternative.p.rapidapi.com/${url}`,{
//      headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY7,
//     'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
//     }
//   });

//   return data;
// };

// export const fetchChannelApi6 = async (url)=> {

// const { data } = await axios.get(`https://yt-api.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key':  process.env.REACT_APP_API_KEY7,
//     'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
//   }
// });
// return data;

// };

// export const fetchApiB6 = async (url)=> {

// const { data } = await axios.get(`https://youtube-v31.p.rapidapi.com/${url}`,{
//   headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY7,
//     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
//   }
// });
// return data;

// };
