import requests
import execjs
import json
cookies = {
    'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745833692',
    'HMACCOUNT': '5316E8BD7726869C',
    'sessionid': 'zqd6yej3hm4idoq9mq2pig8kv4v5hel0',
    'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1745983337',
}

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.mashangpa.com/problem-detail/10/',
    'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745833692; HMACCOUNT=5316E8BD7726869C; sessionid=zqd6yej3hm4idoq9mq2pig8kv4v5hel0; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1745983337',
}

result=0
for page in range(1,21):
    t=execjs.compile(open(r'10\t_value.js').read()).call('get_t',page)
    params = {
        'page': str(page),
        't': t,
    }

    response = requests.get('https://www.mashangpa.com/api/problem-detail/10/data/', params=params, cookies=cookies, headers=headers)
    print(response.status_code)
    print(response.text)
    data_dir=json.loads(response.text)
    array=data_dir["current_array"]
    sum_array=sum(array)
    result+=sum_array
    
print(result)





