import requests
import execjs
import json
result=0
for page in range(1,21):
    v = execjs.compile(open(r'15\v_value.js', encoding='utf-8').read()).call('window.dddd')
    print(v)
    cookies = {
        'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745833692',
        'HMACCOUNT': '5316E8BD7726869C',
        'sessionid': 'zqd6yej3hm4idoq9mq2pig8kv4v5hel0',
        'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1746443330',
        'v': v,
    }

    headers = {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'hexin-v': 'QXp0Y0NDQm4yTUZlbE92dWcwd2k4OEpWeWhTZ2tFZzRTYVFUVkMzNEZ6cFJqRlhLdFdEZjRsbDBvNVUtMTc0NjQ0Mzg3NjE4MA==',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.mashangpa.com/problem-detail/15/',
        'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
        # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745833692; HMACCOUNT=5316E8BD7726869C; sessionid=zqd6yej3hm4idoq9mq2pig8kv4v5hel0; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1746443330; v=QTUzNmJyTE5wcjhzM2swSVVYWnNQUkF2ckhLU3V0YW0yLTgxOGw5aTJlTWhFYlBzSndyaDNHcy1SYlRzMTc0NjQ0Mzg3NjE4MA==',
    }

    params = {
        'page': str(page),
    }

    response = requests.get('https://www.mashangpa.com/api/problem-detail/15/data/', params=params, cookies=cookies, headers=headers)
    print(response.status_code)
    print(response.text)
    data_dir=json.loads(response.text)
    array=data_dir["current_array"]
    sum_array=sum(array)
    result+=sum_array
    
print(result)