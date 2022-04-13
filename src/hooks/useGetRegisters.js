import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';
import getTokenUser from '../services/getTokenUser';

const useGetRegisters = (identifier, password, endpoint) => {
  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getRegisters = async () => {
    try {
      setLoading(true);

      const userToken = await getTokenUser(identifier, password);
      const { data } = await apiConfig.get(endpoint, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setRegisters(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRegisters();
  }, []);

  return { registers, loading, error };
};

export default useGetRegisters;
