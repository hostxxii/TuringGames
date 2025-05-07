import requests
import hmac
import hashlib
import time
import  base64
import json
def btoa(s):
    return base64.b64encode(s.encode('utf-8')).decode('utf-8')

# 加密值

t=str(int(time.time()*1000))
encrypted_value = "9527"+t
# print(str(int(time.time()*1000)))
tt=btoa(t)
print(type(tt))

# 密钥
key = "xxxooo"

# 创建 HmacSHA1 对象
hmac_sha1 = hmac.new(key.encode('utf-8'), encrypted_value.encode('utf-8'), hashlib.sha1)

# 获取 HMAC 值的十六进制表示
m = hmac_sha1.hexdigest()

cookies = {
    'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745833692',
    'HMACCOUNT': '5316E8BD7726869C',
    'sessionid': 'zqd6yej3hm4idoq9mq2pig8kv4v5hel0',
    'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1745833909',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'content-type': 'application/json',
    'origin': 'https://www.mashangpa.com',
    'priority': 'u=1, i',
    'referer': 'https://www.mashangpa.com/problem-detail/9/',
    'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745833692; HMACCOUNT=5316E8BD7726869C; sessionid=zqd6yej3hm4idoq9mq2pig8kv4v5hel0; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1745833909',
}

result=0
for page in range(1,21):
    json_data = {
        'page': str(page),
        'm': m,
        'tt': tt,
    }

    response = requests.post('https://www.mashangpa.com/api/problem-detail/9/data/', cookies=cookies, headers=headers, json=json_data)
    print(response.status_code)
    print(response.text)
    data_dir=json.loads(response.text)
    array=data_dir["current_array"]
    sum_array=sum(array)
    result+=sum_array

print(result)
