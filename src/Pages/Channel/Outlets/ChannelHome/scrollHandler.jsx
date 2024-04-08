export const scrollHandler = (class_name,lang)=>{

    const prevIcon = document.querySelector(`.${class_name}-prev`);
    const nextIcon = document.querySelector(`.${class_name}-next`);
   
     const videosContainer =  document.querySelector(`.${class_name}`);
     const videosHolder =  document.querySelector(`.${class_name}-holder`);
     const videosContainerWidth = videosContainer.clientWidth;
     const videosHolderWidth = videosHolder.clientWidth;


     if( videosHolderWidth < videosContainerWidth ){
         console.log('yes')
         nextIcon.style.display = 'none';
         prevIcon.style.display = 'none';
     }else if(lang === 'ar'){
         if(videosContainer.scrollLeft === 0 ){
             nextIcon.style.display = 'none';
         } else if(window.innerWidth > 429){
            
             nextIcon.style.display = 'flex';
         }

         if(-videosContainer.scrollLeft + videosContainerWidth === videosHolderWidth) {
             prevIcon.style.display = 'none';
         }else if(window.innerWidth > 429) {
             prevIcon.style.display = 'flex';
         }
         
     }else{ 
         if(videosContainer.scrollLeft === 0 ){
             prevIcon.style.display = 'none';
         }else if(window.innerWidth > 429){  
             prevIcon.style.display = 'flex';
         }

         if(videosContainer.scrollLeft + videosContainerWidth === videosHolderWidth) {
             nextIcon.style.display = 'none';
         }else if(window.innerWidth > 429){
             nextIcon.style.display = 'flex';
         }
     }
 }