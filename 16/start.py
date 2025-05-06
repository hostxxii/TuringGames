import requests
import subprocess
import ast
import json

# 完全避免修改 sys.stdout，改用直接调用 subprocess 的方式
result = 0

for page in range(1, 21):
    # 使用 subprocess 运行 node 脚本，不修改 sys.stdout
    process = subprocess.Popen(['node', r'16\h5_value.js', f'{page}'],
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE,
                              text=True)
    output, error = process.communicate()

    if error:
        print(f"Error running node script: {error}")
        continue

    key = output.strip()
    key_lst = ast.literal_eval(key)
    # print(key_lst[0])
    # print(key_lst[1])

    cookies = {
        'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183': '1745833692',
        'HMACCOUNT': '5316E8BD7726869C',
        'sessionid': 'zqd6yej3hm4idoq9mq2pig8kv4v5hel0',
        'v': 'QThMZlE5bEtFUjdQUndMWTdXSTdQSk1tRThNaGs4Y2hlSmE2MFF6YjduM2dZR3g5OUNNV3ZVZ25DdUxmMTc0NjUyMjQwOTM5NA==',
        'Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183': '1746537459',
    }

    headers = {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'origin': 'https://www.mashangpa.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.mashangpa.com/problem-detail/16/',
        'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        # 'cookie': 'Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1745833692; HMACCOUNT=5316E8BD7726869C; sessionid=zqd6yej3hm4idoq9mq2pig8kv4v5hel0; v=QThMZlE5bEtFUjdQUndMWTdXSTdQSk1tRThNaGs4Y2hlSmE2MFF6YjduM2dZR3g5OUNNV3ZVZ25DdUxmMTc0NjUyMjQwOTM5NA==; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1746537459',
    }

    data = {"page": page, "t": key_lst[1], "h5": key_lst[0]}
    data = json.dumps(data)

    response = requests.post('https://www.mashangpa.com/api/problem-detail/16/data/',
                           cookies=cookies,
                           headers=headers,
                           data=data)
    print(response.status_code)
    data_dir = response.json()
    array = data_dir["current_array"]
    sum_array = sum(array)
    result += sum_array

print(result)