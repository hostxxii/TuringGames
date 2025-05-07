import requests
import execjs
cookies = {
    'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745833692',
    'HMACCOUNT': '5316E8BD7726869C',
    'sessionid': 'zqd6yej3hm4idoq9mq2pig8kv4v5hel0',
    'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1746434881',
}

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://www.mashangpa.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.mashangpa.com/problem-detail/14/',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745833692; HMACCOUNT=5316E8BD7726869C; sessionid=zqd6yej3hm4idoq9mq2pig8kv4v5hel0; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1746434881',
}

import json
result=0
for page in range(1,21):
    m=execjs.compile(open(r'14\m_value.js',encoding='utf-8').read()).call('get_m')

    params = {
        'm': m,
    }

    data = {"page":page}
    data=json.dumps(data)
    response = requests.post(
        'https://www.mashangpa.com/api/problem-detail/14/data/',
        params=params,
        cookies=cookies,
        headers=headers,
        data=data,
    )
    print(response.status_code)
    print(response.text)
    data_dir=json.loads(response.text)
    array=data_dir["current_array"]
    sum_array=sum(array)
    result+=sum_array
    
print(result)