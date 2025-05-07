import requests
import execjs
import json
cookies = {
    'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745833692',
    'HMACCOUNT': '5316E8BD7726869C',
    'sessionid': 'zqd6yej3hm4idoq9mq2pig8kv4v5hel0',
    'v': 'QThMZlE5bEtFUjdQUndMWTdXSTdQSk1tRThNaGs4Y2hlSmE2MFF6YjduM2dZR3g5OUNNV3ZVZ25DdUxmMTc0NjUyMjQwOTM5NA==',
    '_nano_fp': 'XpmYn5dblpdqn0TyX9_WKtiyZNDXSCXWcGFsAXq0',
    'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1746638637',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.mashangpa.com/problem-detail/19/',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745833692; HMACCOUNT=5316E8BD7726869C; sessionid=zqd6yej3hm4idoq9mq2pig8kv4v5hel0; v=QThMZlE5bEtFUjdQUndMWTdXSTdQSk1tRThNaGs4Y2hlSmE2MFF6YjduM2dZR3g5OUNNV3ZVZ25DdUxmMTc0NjUyMjQwOTM5NA==; _nano_fp=XpmYn5dblpdqn0TyX9_WKtiyZNDXSCXWcGFsAXq0; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1746638637',
}
result=0
for page in range(1,21):
    params = {
        'page': str(page),
    }
    response = requests.get('https://www.mashangpa.com/api/problem-detail/19/data/', params=params, cookies=cookies, headers=headers)
    print(response.status_code)
    encrypt_data=response.json()
    raw_decrypt_data = execjs.compile(open(r'19\decrypt.js', encoding='utf-8').read()).call('decrypt', encrypt_data['r'],encrypt_data['k'])
    print(raw_decrypt_data) 
    decrypt_data = json.loads(raw_decrypt_data) 
    array=decrypt_data["current_array"]
    sum_array=sum(array)
    result+=sum_array
    
print(result)
