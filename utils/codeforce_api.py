import requests

API_URL = "https://codeforces.com/api/"

def get_user_stats(handle):
    response = requests.get(f"{API_URL}user.info", params={"handles": handle})
    if response.status_code == 200:
        data = response.json()
        if data["status"] == "OK":
            return data["result"][0]
    return None