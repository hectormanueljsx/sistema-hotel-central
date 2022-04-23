import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';
import getTokenUser from '../services/getTokenUser';

const useGetSpecific = (identifier, password, endpoint, attribute, value) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);

      const userToken = await getTokenUser(identifier, password);
      const { data } = await apiConfig.get(`${endpoint}?${attribute}=${value}`, {
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

export default useGetSpecific;
