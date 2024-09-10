import json
from fastapi import APIRouter, HTTPException, Query
import requests
from bs4 import BeautifulSoup

from config.config import PIRATEBAY_BASE_URL

router = APIRouter()

# Scrape the data from the URL
def scrape_data(url: str):
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Unable to fetch data"}

    try:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Attempt to find the table

        # Find all table rows
        rows = soup.find_all('tr')

        # Create a list to hold the file details
        file_details = []

        # Iterate through rows and extract details
        for row in rows:
            # Get the file name and size
            columns = row.find_all('td')
            if len(columns) == 2:
                file_name = columns[0].get_text(strip=True)
                file_size = columns[1].get_text(strip=True)
                # Append the details to the list
                file_details.append({
                    'file_name': file_name,
                    'file_size': file_size
                })

        # Return the list directly, which will be converted to JSON in FastAPI
        return file_details
    
    except Exception as e:
        # Handle any scraping errors gracefully
        return {"error": f"Error processing row data: {str(e)}"}

@router.get("/item")
def get_item(id: str = Query(""), name: str = Query("")):
    url = f'{PIRATEBAY_BASE_URL}/torrent/{id}/{name}'
    data = scrape_data(url)
    
    # Check for errors in the data
    if 'error' in data:
        raise HTTPException(status_code=500, detail=data['error'])
    
    # Return the data directly
    return {'data': data}
