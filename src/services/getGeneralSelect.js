import apiConfig from '@/api/apiConfig';

const getGeneralSelect = async endpoint => {
  try {
    const jwt = localStorage.getItem('jwt');
    const { data, status } = await apiConfig.get(endpoint, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default getGeneralSelect;
