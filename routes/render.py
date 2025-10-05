from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse  
from fastapi.templating import Jinja2Templates
templates = Jinja2Templates(directory="templates")

router = APIRouter()

@router.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@router.get("/compare", response_class=HTMLResponse)
async def read_compare(request: Request):
    return templates.TemplateResponse("compare.html", {"request": request})

@router.get("/contests", response_class=HTMLResponse)
async def read_contests(request: Request):
    return templates.TemplateResponse("contest.html", {"request": request})
