import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';
import getTokenUser from '../services/getTokenUser';

const usePostRoom = (identifier, password, clima, tv, hab_tarifas) => {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const endpoint = `habitacions`;
  const dataRoom = {
    clima,
    tv,
    hab_tarifas,
  };

  const postRoom = async () => {
    try {
      setLoading(true);

      const userToken = await getTokenUser(identifier, password);
      const { data } = await apiConfig.post(endpoint, dataRoom, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setRoom(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    postRoom();
  }, []);

  return { room, loading, error };
};

export default usePostRoom;
