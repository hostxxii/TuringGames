import requests
import execjs
cookies = {
    'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745833692',
    'HMACCOUNT': '5316E8BD7726869C',
    'sessionid': 'zqd6yej3hm4idoq9mq2pig8kv4v5hel0',
    'v': 'QThMZlE5bEtFUjdQUndMWTdXSTdQSk1tRThNaGs4Y2hlSmE2MFF6YjduM2dZR3g5OUNNV3ZVZ25DdUxmMTc0NjUyMjQwOTM5NA==',
    'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1746589992',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.mashangpa.com/problem-detail/17/',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745833692; HMACCOUNT=5316E8BD7726869C; sessionid=zqd6yej3hm4idoq9mq2pig8kv4v5hel0; v=QThMZlE5bEtFUjdQUndMWTdXSTdQSk1tRThNaGs4Y2hlSmE2MFF6YjduM2dZR3g5OUNNV3ZVZ25DdUxmMTc0NjUyMjQwOTM5NA==; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1746589992',
}
import json
result=0
for page in range(1,21):
    params = {
        'page': str(page),
    }
    
    response = requests.get('https://www.mashangpa.com/api/problem-detail/17/data/', params=params, cookies=cookies, headers=headers)
    print(response.status_code)

    data=response.json()
    print(data)

    data_dir=execjs.compile(open(r'17\decrypt.js', encoding='utf-8').read()).call('get_data', data)
    print(data_dir)
    array=data_dir["current_array"]
    int_array = [int(x) for x in array]
    sum_array = sum(int_array)
    result += sum_array

print(result)





