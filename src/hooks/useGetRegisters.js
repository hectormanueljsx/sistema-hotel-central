import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';
import getTokenUser from '../services/getTokenUser';

const useGetRegisters = (identifier, password, start, limit) => {
  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);

  const endpoint = `registros?_start=${start}&_limit=${limit}&_sort=fecha:DESC`;

  const getData = async () => {
    setLoading(true);

    try {
      const userToken = await getTokenUser(identifier, password);
      const { data } = await apiConfig.get(endpoint, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      setRegisters(data);
      setLoading(false);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { registers, loading };
};

export default useGetRegisters;
