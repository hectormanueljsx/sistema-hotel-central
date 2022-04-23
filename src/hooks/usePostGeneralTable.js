import { useEffect, useState } from 'react';

import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const usePostGeneralTable = (identifier, password, endpoint, generalData) => {
  const [general, setGeneral] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const postData = async () => {
    try {
      setLoading(true);

      const userToken = await getTokenUser(identifier, password);
      const { data } = await apiConfig.post(endpoint, generalData, {
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
    postData();
  }, []);

  return { general, loading, error };
};

export default usePostGeneralTable;
