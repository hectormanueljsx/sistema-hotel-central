import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';
import getTokenUser from '../services/getTokenUser';

const usePutUsers = (identifier, passwordGet, username, password, email, confirmed, blocked, rol, id_user) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const endpoint = `users`;

  const dataUser = { username, password, email, confirmed, blocked };
  const dataRole = { role: { id: rol } };

  const putUser = async () => {
    try {
      setLoading(true);

      const userToken = await getTokenUser(identifier, passwordGet);

      const { data } = await apiConfig.put(`${endpoint}/${id_user}`, dataUser, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const { Role } = await apiConfig.put(`${endpoint}/${id_user}`, dataRole, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setUser(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    putUser();
  }, []);

  return { user, loading, error };
};

export default usePutUsers;
