import languagesJson from "../Data/staticData.json";

export const handleSetLanguage = (lang,setStaticData,setLang)=> {

    if (localStorage.getItem("YMHtube-language")) {
        setLang(localStorage.getItem("YMHtube-language"));
      } else {
        localStorage.setItem("YMHtube-language", lang);
      }
  
      if (lang === "ar") {
        document.dir = "rtl";
        setStaticData(languagesJson[1])
      } else {
        document.dir = "ltr";
        setStaticData(languagesJson[0])
      }

}