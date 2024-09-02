// app/page.js
'use client'

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setContent('');
      } else {
        setContent(data.content);
        setError('');
      }
    } catch (error) {
      setError(error.message);
      setContent('');
    }
  };

  return (
    <div>
      <h1>Web Scraper</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Fetch Content</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </div>
  );
}

