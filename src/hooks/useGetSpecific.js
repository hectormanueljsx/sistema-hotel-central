import { useEffect, useState } from 'react';

import apiConfig from '@/api/apiConfig';

const useGetSpecific = (endpoint, attribute, valueAttribute) => {
  const [listGetSpecific, setListGetSpecific] = useState([]);
  const [loadingGetSpecific, setLoadingGetSpecific] = useState(false);
  const [errorGetSpecific, setErrorGetSpecific] = useState(false);

  const getData = async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      setLoadingGetSpecific(true);

      const { data } = await apiConfig.get(`${endpoint}?${attribute}=${valueAttribute}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
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
