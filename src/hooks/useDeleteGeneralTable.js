import { useEffect, useState } from 'react';

import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const useDeleteGeneralTable = (identifier, password, endpoint, id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteData = async () => {
    try {
      setLoading(true);

      const userToken = await getTokenUser(identifier, password);
      const { data } = await apiConfig.delete(`${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    deleteData();
  }, []);

  return { loading, error };
};

export default useDeleteGeneralTable;
