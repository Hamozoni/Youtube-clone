import "./Error.scss";
import { statesContext } from "../../Contexts/statesContext";
import { useContext } from "react";
const Error = ({ error }) => {
  const { staticData, theme } = useContext(statesContext);
  return (
    <div className={`${theme} error`}>
      <h3>
        oops {error?.message} {error?.response?.data?.message && error?.response?.data?.message}
      </h3>
      <button onClick={() => window.location.reload()}>{staticData?.retry}</button>
    </div>
  );
};

export default Error;
