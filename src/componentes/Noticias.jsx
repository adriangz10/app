import React from "react";

const Noticias = ({ noticias }) => {
  return (
    <div className="row">
      {noticias.map((item, index) => (
        <div key={index} className="col">
            <div className="card">
                <img src={item.urlToImage}/>
            </div>
        </div>
      ))}
    </div>
  );
};
