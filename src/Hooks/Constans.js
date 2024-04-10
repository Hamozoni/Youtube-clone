
  export const ternViewsTo = (num)=> {
   
    if (num !== undefined || num !== null || num !== ''){
      parseFloat(num)
      if(num >= 1000 & num <= 9999){
        return `${num.toString().slice(0,1)}K`
      };

      if(num >= 10000 & num <= 99999){
        return `${num.toString().slice(0,2)}K`
      };

      if(num >= 100000 & num <= 999999 ){
        return `${num.toString().slice(0,3)}K`
      };

      if(num >= 1000000 & num <= 9999999 ){
        return `${num.toString().slice(0,1)}M`
      };

      if(num >= 10000000 & num <= 99999999 ){
        return `${num.toString().slice(0,2)}M`
      };

      if(num >= 100000000 & num <= 999999999 ){
        return `${num.toString().slice(0,3)}M`
      };

      if(num >= 1000000000 & num <= 9999999999 ){
        return `${num.toString().slice(0,1)}B`
      };

      if(num >= 10000000000 & num <= 99999999999 ){
        return `${num.toString().slice(0,2)}B`
      };

      if(num >= 100000000000 & num <= 999999999999 ){
        return `${num.toString().slice(0,3)}B`
      }else {
        return num;
      }
    }else {
      return '0';
    };
  };