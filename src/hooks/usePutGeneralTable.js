import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';
import getTokenUser from '../services/getTokenUser';

const usePutGeneralTable = (identifier, password, endpoint, dataGeneral, id) => {
  const [general, setGeneral] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const putGeneral = async () => {
    try {
      setLoading(true);
      const userToken = await getTokenUser(identifier, password);

      const { data } = await apiConfig.put(`${endpoint}/${id}`, dataGeneral, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setGeneral(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    putGeneral();
  }, []);

  return { general, loading, error };
};

export default usePutGeneralTable;
