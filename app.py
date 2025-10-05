from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routes import render,cf_api
# import utils.codeforces_api as cf_api

app = FastAPI()

app.include_router(render.router)
app.include_router(cf_api.router, prefix="/api")




@app.get("/compare/")
async def compare_users(user1: str, user2: str):
    return cf_api.compare_ratings(user1, user2)
