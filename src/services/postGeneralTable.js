import apiConfig from '@/api/apiConfig';

const postGeneralTable = async (endpoint, generalData) => {
  try {
    const jwt = localStorage.getItem('jwt');
    const { data, status } = await apiConfig.post(endpoint, generalData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default postGeneralTable;
