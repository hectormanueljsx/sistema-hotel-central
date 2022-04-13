import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';
import getTokenUser from '../services/getTokenUser';

const useGetGeneralTable = (identifier, password, endpoint) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);

      const userToken = await getTokenUser(identifier, password);
      const { data } = await apiConfig.get(endpoint, {
        headers: {
          Authorization: `Bearer ${userToken}`,
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
