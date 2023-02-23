import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as DB from '@/utils/db';
export function update (data) {
  return axios.post('/update', data).then(response => {
    if (!response || !response.data.success || response.status !== 200) throw Error('highlight is not update !!');
    return response;
  });
}


const mock = new MockAdapter(axios);
mock.onPost('/update').reply(async function (actual) {
  const data = JSON.parse(actual.data);
  await DB.highlights.setItem('highlights', data.highlights);
  return [200, { success: true }];
});