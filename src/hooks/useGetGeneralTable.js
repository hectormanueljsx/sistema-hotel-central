import { useEffect, useState } from 'react';

import apiConfig from '@/api/apiConfig';

const useGetGeneralTable = endpoint => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      setLoading(true);
      const { data } = await apiConfig.get(endpoint, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      setList(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { list, loading, error };
};

export default useGetGeneralTable;
