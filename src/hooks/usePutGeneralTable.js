import { useEffect, useState } from 'react';

import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const usePutGeneralTable = (identifier, password, endpoint, id, generalData) => {
  const [general, setGeneral] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const putData = async () => {
    try {
      setLoading(true);
      const userToken = await getTokenUser(identifier, password);

      const { data } = await apiConfig.put(`${endpoint}/${id}`, generalData, {
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
    putData();
  }, []);

  return { general, loading, error };
};

export default usePutGeneralTable;
