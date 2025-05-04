import requests
import execjs
cookies = {
    'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745833692',
    'HMACCOUNT': '5316E8BD7726869C',
    'sessionid': 'zqd6yej3hm4idoq9mq2pig8kv4v5hel0',
    'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1746332751',
}
import json
result=0
for page in range(1,21):
    key=execjs.compile(open(r'13\r&s_value.js','r',encoding='utf-8').read()).call('$.beforeSend',page)
    print(key)
    
    headers = {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'origin': 'https://www.mashangpa.com',
        'priority': 'u=1, i',
        'r': key[1],
        'referer': 'https://www.mashangpa.com/problem-detail/13/',
        's': key[2],
        'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        't': str(key[0]),
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745833692; HMACCOUNT=5316E8BD7726869C; sessionid=zqd6yej3hm4idoq9mq2pig8kv4v5hel0; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1746332751',
    }

    data = f'{{"page":"{page}"}}'
    print(data)

    response = requests.post('https://www.mashangpa.com/api/problem-detail/13/data/', cookies=cookies, headers=headers, data=data)
    print(response.status_code)
    print(response.text)
    data_dir=json.loads(response.text)
    # print(data)
    array=data_dir["current_array"]
    sum_array=sum(array)
    result+=sum_array
    
print(result)