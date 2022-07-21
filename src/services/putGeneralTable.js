import apiConfig from '@/api/apiConfig';

const putGeneralTable = async (endpoint, id, generalData) => {
  try {
    const jwt = localStorage.getItem('jwt');
    const { data, status } = await apiConfig.put(`${endpoint}/${id}`, generalData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return { data, status };
  } catch (error) {
    return error;
  }
};

export default putGeneralTable;
