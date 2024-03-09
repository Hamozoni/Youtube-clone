

const Loader = () => {

  const loaderCard = []
  loaderCard.length = 20;

  return (
    <div className="related-loader">
      <div className="loader-container">
        {
          loaderCard?.map(()=>(
            <div className="loader-card">
              <div className="l-image">
              </div>
              <div className="l-titles">
                  <div className="title">
                      <div className="ch-image"></div>
                      <div className="name"></div>
                  </div>
                  <div className="date"></div>
              </div>
            </div>  
          ))
        }

      </div>
    </div>
  )
}

export default Loader