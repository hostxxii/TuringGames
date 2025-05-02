import requests
import execjs

cookies = {
    'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745662381',
    'HMACCOUNT': '5316E8BD7726869C',
    'sessionid': 'nr8i48w8cphcf5nudyjv8wirqubpybb6',
    'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1745739941',
    's': '51b351b351b351b370b0d0f0b0d010d090b0715010',
}

import json
result=0
for page in range(1,21):

    data=execjs.compile(open(r'第八题\m_value.js',encoding='utf-8').read()).call('get_m',page)
    # print(data)

    headers = {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'm': data[0],
        'origin': 'https://stu.tulingpyton.cn',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://stu.tulingpyton.cn/problem-detail/8/',
        'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        't': data[1],
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745662381; HMACCOUNT=5316E8BD7726869C; sessionid=nr8i48w8cphcf5nudyjv8wirqubpybb6; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1745739941; s=51b351b351b351b370b0d0f0b0d010d090b0715010',
    }

    json_data = {
        'page':page,
    }

    response = requests.post('https://stu.tulingpyton.cn/api/problem-detail/8/data/', cookies=cookies, headers=headers, json=json_data)
    

    print(response.status_code)
    print(response.text)
    data_dir=json.loads(response.text)
    array=data_dir["current_array"]
    sum_array=sum(array)
    result+=sum_array

print(result)


