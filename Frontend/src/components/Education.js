import React, { useState } from 'react';
import './Education.css';

const articles = [
  { id: 1, title: 'Recycling Plastic', summary: 'Learn how to properly recycle plastic waste.', content: 'Recycling plastic helps reduce landfill waste and preserves natural resources. Start by sorting plastics, rinsing containers, and dropping them at a recycling center.' },
  { id: 2, title: 'Composting Organic Waste', summary: 'Turn kitchen scraps into nutrient-rich compost.', content: 'Composting transforms organic waste into fertilizer. Use a compost bin, mix greens and browns, and keep it moist for the best results.' },
  { id: 3, title: 'Electronic Waste Disposal', summary: 'Dispose of electronics safely and responsibly.', content: 'Electronic waste contains hazardous materials. Recycle electronics at approved centers and do not discard them in regular trash.' },
];

const Education = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="education-page">
      <h1>Education</h1>
      <div className="education-grid">
        {selected ? (
          <div className="article-detail">
            <button onClick={() => setSelected(null)} className="btn-secondary">Back</button>
            <h2>{selected.title}</h2>
            <p>{selected.content}</p>
          </div>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="article-card" onClick={() => setSelected(article)}>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Education;
