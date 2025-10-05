from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routes import cf_api
# import utils.codeforces_api as cf_api

app = FastAPI()
app.include_router(cf_api.router, prefix="/api")

