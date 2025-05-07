import requests
import execjs
import json
cookies = {
    'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745206241',
    'HMACCOUNT': 'EA80830BD92F82B0',
    'sessionid': 'sdppwfgsy8uvri4yhoccbeecrpz3veig',
    'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1745291826',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://stu.tulingpyton.cn/problem-detail/4/',
    'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745206241; HMACCOUNT=EA80830BD92F82B0; sessionid=sdppwfgsy8uvri4yhoccbeecrpz3veig; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1745291826',
}

result=0
for page in range(1,21):
    keydata=execjs.compile(open(r'04\sign_value.js',encoding='utf-8').read()).call('get_sign',page)
    print(keydata,page)

    params = {
    'page': page,
    'sign': keydata[0],
    '_ts': keydata[1],
    }

    response = requests.get('https://stu.tulingpyton.cn/api/problem-detail/4/data/', params=params, cookies=cookies, headers=headers)
    print(response.status_code)
    print(response.text)
    data=json.loads(response.text)
    array=data["current_array"]
    sum_array=sum(array)
    result+=sum_array

print(result)
