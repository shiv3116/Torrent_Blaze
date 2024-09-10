from fastapi import FastAPI
from routers import pirateBay , pirateBayListItem

app = FastAPI()

# Include the routers
app.include_router(pirateBay.router, prefix="/torrent_blaze")
app.include_router(pirateBayListItem.router, prefix="/torrent_blaze")

@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI application!"}