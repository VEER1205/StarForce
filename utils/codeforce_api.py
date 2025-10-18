import requests
from datetime import datetime,timezone,timedelta

API_URL = "https://codeforces.com/api/"

def getUserStats(handle):
    """Return combined user info, rating history (last 10), and problems solved."""
    # 1️⃣ Basic user info
    user_info_res = requests.get(f"{API_URL}user.info?handles={handle}")
    user_info_res.raise_for_status()
    user_info_data = user_info_res.json()
    if user_info_data["status"] != "OK":
        return {"error": "User not found"}
    user_info = user_info_data["result"][0]
    # 2️⃣ Rating history (last 10 contests)
    rating_res = requests.get(f"{API_URL}user.rating", params={"handle": handle})
    rating_res.raise_for_status()
    rating_data = rating_res.json()
    rating_history = []
    if rating_data["status"] == "OK":
        for entry in rating_data["result"]:
            rating_history.append({
                "contestName": entry["contestName"],
                "newRating": entry["newRating"],
                "contestId": entry["contestId"],
                "date": convert_unix_to_readable(entry["ratingUpdateTimeSeconds"])
            })

    # 3️⃣ Count problems solved
    submissions_res = requests.get(f"{API_URL}user.status", params={"handle": handle})
    submissions_res.raise_for_status()
    submissions_data = submissions_res.json()
    solved_count = 0
    if submissions_data["status"] == "OK":
        solved_set = set()
        for sub in submissions_data["result"]:
            if sub.get("verdict") == "OK":
                problem_id = f"{sub['problem']['contestId']}-{sub['problem']['index']}"
                solved_set.add(problem_id)
        solved_count = len(solved_set)

    return {
        "handle": user_info["handle"],
        "rating": user_info.get("rating"),
        "rank": user_info.get("rank"),
        "maxRating": user_info.get("maxRating"),
        "ratingHistory": rating_history,
        "problemsSolved": solved_count
    }

def compareRatings(user1, user2):
    user1_stats = getUserRating(user1)
    user2_stats = getUserRating(user2)
    if not user1_stats or not user2_stats:
        return {"error": "One or both users not found"}
    return {"user1": user1_stats, "user2": user2_stats}

def getUserRating(handle):
    try:
        response = requests.get(f"{API_URL}user.rating", params={"handle": handle})
        response.raise_for_status()
        data = response.json()
        if data.get("status") == "OK":
            return data["result"][:10] if data["result"] else None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data for {handle}: {e}")
    return None


def getAllContests():
    response = requests.get(f"{API_URL}contest.list")
    if response.status_code == 200:
        data = response.json()
        if data["status"] == "OK":
            contests_before = data["result"]
            for contest in contests_before:
                contest["startTimeSeconds"] = convert_unix_to_readable(contest["startTimeSeconds"])
                contest["duration"] = contest["durationSeconds"] // 60
            return contests_before
    return None


def convert_unix_to_readable(unix_timestamp):
    IST = timezone(timedelta(hours=5, minutes=30))
    return datetime.fromtimestamp(unix_timestamp, tz=IST).strftime("%Y-%m-%d %I:%M:%S %p")

def getAllProblems():
    response = requests.get(f"{API_URL}problemset.problems")
    if response.status_code == 200:
        data = response.json()
        if data["status"] == "OK":
            return data["result"]["problems"]
    return None

def getProblemByTag(tag):
    response = requests.get(f"{API_URL}problemset.problems?tags={tag}")
    if response.status_code == 200:
        data = response.json()
        if data["status"] == "OK":
            return data["result"]["problems"]
    return None

