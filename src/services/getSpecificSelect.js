import apiConfig from '@/api/apiConfig';

const getSpecificSelect = async (endpoint, attribute, valueAttribute) => {
  try {
    const jwt = localStorage.getItem('jwt');
    const { data, status } = await apiConfig.get(`${endpoint}?${attribute}=${valueAttribute}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default getSpecificSelect;
