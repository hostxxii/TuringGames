
import time
import requests
import json
def encrypt(var0, var1):
    return var0 + (var1 // 3) + 16358

cookies = {
    'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745833692',
    'HMACCOUNT': '5316E8BD7726869C',
    'sessionid': 'zqd6yej3hm4idoq9mq2pig8kv4v5hel0',
    'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1745998204',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.mashangpa.com/problem-detail/11/',
    'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745833692; HMACCOUNT=5316E8BD7726869C; sessionid=zqd6yej3hm4idoq9mq2pig8kv4v5hel0; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1745998204',
}

result=0
for page in range(1,21):
    _ts=int(time.time())
    m=encrypt(page, _ts)
    print(type(m))
    params = {
        'page': str(page),
        'm': str(m),
        '_ts': str(_ts),
    }

    response = requests.get('https://www.mashangpa.com/api/problem-detail/11/data/', params=params, cookies=cookies, headers=headers)
    print(response.status_code)
    print(response.text)
    data_dir=json.loads(response.text)
    array=data_dir["current_array"]
    sum_array=sum(array)
    result+=sum_array
    
print(result)