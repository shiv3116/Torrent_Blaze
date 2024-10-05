import json
from fastapi import APIRouter, HTTPException
import requests
from bs4 import BeautifulSoup
from config.config import PIRATEBAY_BASE_URL
import re

router = APIRouter()

# Scrape the data from the URL
def scrape_data(url: str):
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Unable to fetch data"}
    
    soup = BeautifulSoup(response.text, 'html.parser')

    approx_results = soup.find('h2')
    approx_results = re.search(r'\(approx (\d+) found\)', approx_results.text)
    if approx_results:
        approx_results = approx_results.group(1)
    else:
        approx_results = ''

    # Initialize the results list
    results = []

    results.append({'approxResults': approx_results})

    # Attempt to find the table
    table = soup.find('table', {'id': 'searchResult'})
    if not table:
        return {"error": "Table not found on the page"}
    
    rows = table.find_all('tr', class_=lambda x: x != 'header')

    for row in rows:
        columns = row.find_all('td')
        if len(columns) >= 4:  # Ensure there are enough columns
            try:
                category = columns[0].text.strip().replace('\r', '').replace('\n', '').replace('\t', '')

                #name
                name = columns[1].find('div', {'class': 'detName'}).text.strip()

                #id
                id = columns[1].find('a' , href=True)['href'].split('/')[4]

                all_links = columns[1].find_all('a', href=True)

                #magnetlink
                magnet_link = all_links[1]['href'] if len(all_links) > 1 else "No magnet link found"

                #seeders
                seeders = columns[2].text.strip()

                #leachers
                leechers = columns[3].text.strip()


                # Extract additional details (Uploaded date, Size, Uploader)
                font_tag = columns[1].find('font', {'class': 'detDesc'})
                if font_tag:
                    font_text = font_tag.text.strip()

                    # Split the font text to get upload date, size, and uploader
                    upload_info = font_text.split(',')

                    #upload_date
                    upload_date = upload_info[0].replace('Uploaded ', '').strip()  # Extract upload date
                    size = upload_info[1].replace('Size ', '').strip()  # Extract size

                    # Extract uploader
                    uploader = font_tag.find('a', {'class': 'detDesc'}).text.strip() if font_tag.find('a', {'class': 'detDesc'}) else "Unknown"

                results.append({
                    'id':id,
                    'category': category,
                    'name': name,
                    'magnet_link': magnet_link,
                    'seeders': seeders,
                    'leechers': leechers,
                    'upload_date':upload_date,
                    'size': size
                })
            except Exception as e:
                # Handle any scraping errors gracefully
                return {"error": f"Error processing row data: {str(e)}"}

    return results

# API route for the search query
@router.get("/data/{search_query}")
def get_item(search_query: str):
    url = f'{PIRATEBAY_BASE_URL}/s/?q={search_query}'
    data = scrape_data(url)
    
    if 'error' in data:
        # Raise an HTTP 500 error if scraping failed
        raise HTTPException(status_code=500, detail=data['error'])
    
    return {'data': data}
