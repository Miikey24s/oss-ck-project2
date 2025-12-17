import { useEffect, useState } from 'react';

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  const [greeting, setGreeting] = useState('');
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [greetRes, dbRes] = await Promise.all([
          fetch(`${apiBase}/api/greeting`),
          fetch(`${apiBase}/api/db-check`),
        ]);

        if (!greetRes.ok) {
          throw new Error(`Greeting request failed: ${greetRes.status}`);
        }
        if (!dbRes.ok) {
          throw new Error(`DB check request failed: ${dbRes.status}`);
        }

        const greetData = await greetRes.json();
        const dbData = await dbRes.json();

        setGreeting(greetData.message ?? 'No message returned');
        setDbStatus(dbData);
        setError('');
      } catch (err) {
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="app">
      <header>
        <h1>Project 2 Demo</h1>
        <p>API base: {apiBase}</p>
      </header>

      <section className="card">
        <h2>Greeting</h2>
        {loading ? <p>Loading...</p> : <p>{greeting}</p>}
      </section>

      <section className="card">
        <h2>Database Check</h2>
        {loading && <p>Loading...</p>}
        {!loading && error && <p className="error">{error}</p>}
        {!loading && !error && dbStatus && (
          <div className="status">
            <p>OK: {String(dbStatus.ok)}</p>
            <p>Now: {dbStatus.now ?? 'N/A'}</p>
            {dbStatus.error && <p className="error">Error: {dbStatus.error}</p>}
          </div>
        )}
      </section>
    </main>
  );
}
