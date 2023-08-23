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
        console.error("Error fetching news:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Noticias</h1>
      <div className="row">
        {news.map((article) => (
          <div key={article.url} className="col">
            <div className="card">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
