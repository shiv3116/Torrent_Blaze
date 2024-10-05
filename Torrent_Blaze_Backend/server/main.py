from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import pirateBay , pirateBayListItem

app = FastAPI()

# Include the routers
app.include_router(pirateBay.router, prefix="/torrent_blaze")
app.include_router(pirateBayListItem.router, prefix="/torrent_blaze")

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from this origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def root():
    return {"message": "Welcome to the Torrent Blaze Application!"}