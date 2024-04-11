
// save users selected theme in local storage

export const handleSelectedTheme = (selectedTheme,setSelectedTheme)=> {
    window.localStorage['maimed-tube-theme'] = selectedTheme;
    setSelectedTheme(selectedTheme);
}

// matches users selected theme and then changed to dark or light const if it's auto check time or if it's device theme check user's device theme

export  const handleThemechanges = (setSelectedTheme,selectedTheme,setTheme)=> {

    if (localStorage.getItem("maimed-tube-theme")) {
        setSelectedTheme(localStorage.getItem("maimed-tube-theme"));
      } else {
        localStorage.setItem("maimed-tube-theme", selectedTheme);
      }

    if(selectedTheme === 'deviceTheme'){

        let deviceTh = window.matchMedia('(prefers-color-scheme: dark)');

        if(deviceTh.matches) {
            setTheme('dark')
        } else {
            setTheme('light')
        }

    }else if (selectedTheme === 'autoTheme'){

        const hour = new Date().getHours();
        console.log(hour)

        if(hour > 5 && hour < 18) {
            setTheme('light')
        }else {
            setTheme('dark')
        }
    } else {
        setTheme(selectedTheme);
    }
};


