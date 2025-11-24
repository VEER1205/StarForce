from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routes import render,cf_api
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
# import utils.codeforces_api as cf_api

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # or specify ["http://127.0.0.1:5500"] if using Live Server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(render.router)
app.include_router(cf_api.router, prefix="/api")
app.api_route("/heatlth", methods=["GET","HEAD"])(lambda: {"status": "ok"})
