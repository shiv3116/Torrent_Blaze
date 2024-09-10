import os

# Define the path to the .ini file
config_file_path = os.path.join('const', 'const.ini')

# Dictionary to hold the key-value pairs
config_dict = {}

# Open and read the .ini file manually
with open(config_file_path, 'r') as config_file:
    for line in config_file:
        line = line.strip()  # Remove leading/trailing whitespace
        # Ignore comments or empty lines
        if not line or line.startswith('#'):
            continue
        # Split the line into key and value
        key, value = line.split('=', 1)
        config_dict[key.strip()] = value.strip()

# Access the key-value pair
PIRATEBAY_BASE_URL = config_dict['PIRATEBAY_BASE_URL']

print(PIRATEBAY_BASE_URL)
