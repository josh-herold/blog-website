import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:1337';

const useStrapiData = (endpoint, fallback, options = {}) => {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/${endpoint}`, options);
        setData(res.data.data || fallback);
      } catch (error) {
        console.warn(`Fehler beim Laden von ${endpoint}. Verwende Fallback.`);
        setData(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading };
};

export default useStrapiData;
