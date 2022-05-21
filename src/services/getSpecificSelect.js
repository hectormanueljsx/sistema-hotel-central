import apiConfig from '@/api/apiConfig';
import getTokenUser from '@/services/getTokenUser';

const getSpecificSelect = async (identifier, password, endpoint, attribute, valueAttribute) => {
  try {
    const userToken = await getTokenUser(identifier, password);
    const { data } = await apiConfig.get(`${endpoint}?${attribute}=${valueAttribute}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

export default getSpecificSelect;
