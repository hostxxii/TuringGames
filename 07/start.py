import requests
import execjs
import json
cookies = {
    'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745206241',
    'HMACCOUNT': 'EA80830BD92F82B0',
    'sessionid': 'sdppwfgsy8uvri4yhoccbeecrpz3veig',
    'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1745598961',
}
result=0
for page in range(1,21):
    data1=execjs.compile(open(r'第七题\m_value.js',encoding='utf-8').read()).call('get_m_ts')

    headers = {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'm': data1['m'],
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://stu.tulingpyton.cn/problem-detail/7/',
        'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'ts': str(data1['ts']),
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745206241; HMACCOUNT=EA80830BD92F82B0; sessionid=sdppwfgsy8uvri4yhoccbeecrpz3veig; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1745598961',
    }

    data2=execjs.compile(open(r'第七题\x_value.js',encoding='utf-8').read()).call('get_x',data1['m'])
  
    params = {
        'page': str(page),
        'x': data2,
    }

    response = requests.get('https://stu.tulingpyton.cn/api/problem-detail/7/data/', params=params, cookies=cookies, headers=headers)
    # print(response.status_code)
    # print(response.text)
    json_data=json.loads(response.text)
    # print(json_data)
    r_str=json_data['r']
    # print(type(r_str))

    data3=execjs.compile(open(r'第七题\r_value.js',encoding='utf-8').read()).call('window.cccc',r_str)
    print(data3)
    data3=json.loads(data3)
    array=data3["current_array"]
    sum_array=sum(array)
    result+=sum_array
print(result)