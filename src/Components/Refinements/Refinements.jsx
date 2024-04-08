import { useContext, useState } from "react";
import { statesContext } from "../../Contexts/statesContext";

const Refinements = ({ refinements, onClick }) => {
  const { theme } = useContext(statesContext);
  const [currentRefine, setCurrenRefine] = useState("");

  const handleClick = (key) => {
    setCurrenRefine(key);
    if (currentRefine !== key) {
      onClick(key, false);
    }
  };

  return (
    <div className={`back-color-${theme} related-keywords`}>
      <nav className="related-container">
        <ul className={`${theme} taps`}>
          {refinements?.map((refine, i) => (
            <li onClick={() => handleClick(refine)} key={refine + i} className={`${currentRefine === refine ? `back-act-c-${theme}-2 active` : ""} back-color-${theme}-1 back-hov-c-${theme}-2 t-color-${theme}-1  back-act-c-${theme}-3 `}>
              {refine}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Refinements;
