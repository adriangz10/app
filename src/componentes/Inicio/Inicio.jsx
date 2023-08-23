import { useState, useEffect } from "react";

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
    <div className="container mt-5">
      <div className="row">
        {news.map((article) => (
          <div key={article.url} className="col mb-4">
            <div className="card" style={{minWidth: "200px"}}>
              <div className="card-body">
              <h3 className="card-title">{article.title}</h3>
              <hr />
              <p>{article.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
