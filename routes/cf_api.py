from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from utils import codeforce_api
from fastapi import HTTPException

router = APIRouter()

@router.get("/user/{handle}")
async def getUserData(handle: str):
    user_stats = codeforce_api.getUserStats(handle)
    return user_stats

@router.get("/compare/")
async def compareRatings(user1: str, user2: str): 
    return codeforce_api.compareRatings(user1, user2)

@router.get("/contests/")
async def listContests():
    contests = codeforce_api.getAllContests()
    return contests

@router.get("/allproblems/")
async def listAllProblems():
    problems = codeforce_api.getAllProblems()
    if not problems:
        raise HTTPException(status_code=500, detail="Failed to fetch problems.")
    return problems

@router.get("/problemsbytag/{tag}")
async def listProblemsByTag(tag: str):
    problems = codeforce_api.getProblemByTag(tag)
    if not problems:
        raise HTTPException(status_code=500, detail="Failed to fetch problems.")
    return problems

