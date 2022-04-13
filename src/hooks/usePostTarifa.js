import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';
import getTokenUser from '../services/getTokenUser';

const usePostTarifa = (identifier, password, description, price, persons) => {
  const [tarifa, setTarifa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const endpoint = `tarifas`;
  const dataTarifa = { description, price, persons };

  const postTarifa = async () => {
    try {
      setLoading(true);

      const userToken = await getTokenUser(identifier, password);
      const { data } = await apiConfig.post(endpoint, dataTarifa, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setTarifa(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    postTarifa();
  }, []);

  return { tarifa, loading, error };
};

export default usePostTarifa;
