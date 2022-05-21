import { useEffect, useState } from 'react';

import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const useGetSpecific = (identifier, password, endpoint, attribute, valueAttribute) => {
  const [listGetSpecific, setListGetSpecific] = useState([]);
  const [loadingGetSpecific, setLoadingGetSpecific] = useState(false);
  const [errorGetSpecific, setErrorGetSpecific] = useState(false);

  const getData = async () => {
    try {
      setLoadingGetSpecific(true);

      const userToken = await getTokenUser(identifier, password);
      const { data } = await apiConfig.get(`${endpoint}?${attribute}=${valueAttribute}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setListGetSpecific(data);
    } catch (error) {
      setErrorGetSpecific(error);
    } finally {
      setLoadingGetSpecific(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { listGetSpecific, loadingGetSpecific, errorGetSpecific };
};

export default useGetSpecific;
