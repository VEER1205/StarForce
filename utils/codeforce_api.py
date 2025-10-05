import requests
from datetime import datetime

API_URL = "https://codeforces.com/api/"

def getUserStats(handle):
    response = requests.get(f"{API_URL}user.info?handles={handle}")
    if response.status_code == 200:
        data = response.json()
        if data["status"] == "OK":
            return data["result"]
    return "User not found"

def getUserRating(handle):
    try:
        response = requests.get(f"{API_URL}user.rating", params={"handle": handle})
        response.raise_for_status()  # Raises an HTTPError for bad responses
        data = response.json()
        if data.get("status") == "OK":
            return data["result"][:10] if data["result"] else None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data for {handle}: {e}")
    return None

def compareRatings(user1, user2):
    user1_stats = getUserRating(user1)
    user2_stats = getUserRating(user2)

    if not user1_stats or not user2_stats:
        return {"error": "One or both users not found"}

    # Fetch most recent contests for each user
    comparison = {
        "user1": user1_stats,
        "user2": user2_stats,
    }
    return comparison

def convert_unix_to_readable(unix_timestamp):
    return datetime.fromtimestamp(unix_timestamp).strftime("%Y-%m-%d %H:%M:%S")

def getAllContests():
    response = requests.get(f"{API_URL}contest.list")
    if response.status_code == 200:
        data = response.json()
        if data["status"] == "OK":
            contests_before = [contest for contest in data["result"] if contest["phase"] == "BEFORE"]
            for contest in contests_before:
                contest["relativeTimeSeconds"] = convert_unix_to_readable(contest["startTimeSeconds"] + contest["relativeTimeSeconds"])
                contest["startTimeSeconds"] = convert_unix_to_readable(contest["startTimeSeconds"])
                contest["duration"] = contest["durationSeconds"] // 60
            return contests_before
    return None