import React, { useEffect, useState } from 'react';
import axios from 'axios';
import weather1 from '../Images/weather1.jpg';
import './News.css';
import ReactPaginate from 'react-paginate';

const News = () => {
  const [weatherNews, setWeatherNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchWeatherNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'weather',
            apiKey: '9a82b297e7074e3d938cc96a8ba9f30b',
          },
        });
        setWeatherNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching weather news:', error);
      }
    };

    fetchWeatherNews();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = weatherNews.slice(startIndex, endIndex);

  return (
    <div>
      <div className='newsheader'>
        <p style={{ color: 'rgba(64,45,134,255)', fontSize: 70, padding: '50px 200px', backgroundColor: 'rgba(247,248,250,255)' }}>
          <b>News</b>
        </p>
      </div>
      <div className='Topfirst'>
        {weatherNews.length > 0 ? (
          <div className='firstsection'>
            <p style={{ color: 'rgba(109,95,162,255)', fontSize: 30, paddingBottom: 50 }}>
              <b>Top Weather News</b>
            </p>
            {weatherNews[0].title && (
              <p style={{ fontSize: 50, width: 700, paddingBottom: 30 }}>
                <b>{weatherNews[0].title}</b>
              </p>
            )}
            {weatherNews[0].description && (
              <p style={{ fontSize: 20, width: 700, paddingBottom: 30 }}>
                {weatherNews[0].description}
              </p>
            )}
            {weatherNews[0].url && (
              <a href={weatherNews[0].url} target="_blank" rel="noopener noreferrer" style={{ paddingTop: 50, textDecoration: 'none', color: 'rgb(105, 136, 194)', fontSize: 25 }}>
                <b>Read More</b>
              </a>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div>
          <img src={weather1} width={570} height={400} alt='weather' style={{ borderRadius: 20 }} />
        </div>
      </div>
      <div className='cartingnews'>
        <div className='fullcartnews'>
          {currentItems.map((article, index) => (
            (article.urlToImage && article.title && article.description && article.url) && (
              <div className='paddingcart' key={index}>
                <div className='weathercart'>
                  <img src={article.urlToImage || weather1} alt='weather1' width={350} height={250} style={{ paddingBottom: 20 }} />
                  <p style={{ fontSize: 30, width: 350, paddingBottom: 10 }}>
                    <b>{article.title}</b>
                  </p>
                  <p style={{ fontSize: 15, width: 350, paddingBottom: 20 }}>
                    {article.description}
                  </p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(114,100,165,255)', textDecoration: 'none' }}>
                    <b>Read More</b>
                  </a>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      <div className='pagination'>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(weatherNews.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
}

export default News;
