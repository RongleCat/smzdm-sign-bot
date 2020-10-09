const axios = require('axios');
const day = require('dayjs');

const ZDM_COOKIE =
  '__ckguid=4EN9TurRIf5oX622WBe7k67; device_id=194489463416013703130792141aa100950e70043d168e1af0f4a0af31; __jsluid_s=81a4ef393ace56489d6e0523112d1838; _ga=GA1.2.1666242803.1601370313; _gid=GA1.2.413498286.1601370313; Hm_lvt_9b7ac3d38f30fe89ff0b8a0546904e58=1601370227; smzdm_user_source=7870346C30DBA4ACDF3A6A60BC45D88C; sajssdk_2015_cross_new_user=1; zdm_qd=%7B%7D; sess=OWFhMGJ8MTYwNjU1NzMyNXwxODkxMTEzODMzfGQyYTA5YTc0NmVlNTM5MWJkZjQ1MWY3NGI0MDdhN2Jl; user=user%3A1891113833%7C1891113833; smzdm_id=1891113833; Hm_lpvt_9b7ac3d38f30fe89ff0b8a0546904e58=1601373328; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22174d91bd3506fe-09a2e913fa0413-6b31017e-2621440-174d91bd351cee%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Fzhiyou.smzdm.com%2Fuser%2F%22%7D%2C%22%24device_id%22%3A%22174d91bd3506fe-09a2e913fa0413-6b31017e-2621440-174d91bd351cee%22%7D; smzdm_user_view=127A4E102BD4FA405C3ED65BB7D04843; ';
// process.env.ZDM_COOKIE
// const PUSH_URL = `https://sc.ftqq.com/${process.env.SERVER_KEY}.send`;
const PUSH_URL = `https://sc.ftqq.com/SCU55081Td9f2fe1195924586c3e36c3eb8328e4b5f6b580e0fac3.send`;

const ZDM_HEADER = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
  Host: 'zhiyou.smzdm.com',
  Referer: 'https://zhiyou.smzdm.com/user/',
  Cookie: ZDM_COOKIE,
};

async function sendNotify(text, desp) {
  // console.log(`${PUSH_URL}?text=${text}&desp=${desp}`)
  return axios(`${PUSH_URL}?text=${encodeURI(text)}&desp=${encodeURI(desp)}`);
}

async function start() {
  if (!ZDM_COOKIE) {
    console.log('请先设置 cookie');
    return;
  }

  try {
    let { data } = await axios.get(
      'https://zhiyou.smzdm.com/user/info/jsonp_get_current',
      {
        headers: ZDM_HEADER,
      }
    );

    await sendNotify('请求结果', JSON.stringify(data));

    // console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

start();
