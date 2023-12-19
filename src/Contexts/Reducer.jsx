
function filtering (state,payload){
  const filteredState = state.filter((el)=> el.videoId !== payload.videoId);
   return [payload,...filteredState]
}

export const reducer = (state,action)=>{
        switch (action.type){
            case 'add-to-history':{
                return {
                    ...state,
                    history : filtering(state.history,action.payload)
                }
            }

            case 'add-to-liked' : {
                return {
                    ...state,
                    likedVideos : [...state.likedVideos,action.payload]
                }
            }
            case 'subscribe' : {
                return {
                    ...state,
                    subscribtion : [...state.subscribtion,action.payload]
                }
            }       
        }
}