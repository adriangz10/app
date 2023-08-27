import { useState, useEffect } from "react";
import "./Inicio.css";

export function Inicio() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = "ccbb3d66fce440c5a8493fe3f243e876";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=ar&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="container" id="container-img">
        <div className="row">
          <div className="col mb-4">
            <img
              className="img-header"
              src="/img/fcad-header.jpg"
              class="img-thumbnail rounded mx-auto d-block"
              alt="..."
            />
          </div>
        </div>
      </div>
      <div className="row">
        {news.map((article) => (
          <div key={article.url} className="col-4 mb-4">
            <div className="card text-center" style={{ minWidth: "200px" }}>
              <div className="card-body">
                <h3 className="card-title">{article.title}</h3>
                <a href={article.url} class="card-link">
                  ver mas
                </a>
                <hr />
                <p>Fuente: {article.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
