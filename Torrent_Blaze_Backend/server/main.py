from fastapi import FastAPI
from routers import pirateBay , pirateBayListItem

app = FastAPI()

# Include the routers
app.include_router(pirateBay.router, prefix="/api")
app.include_router(pirateBayListItem.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI application!"}