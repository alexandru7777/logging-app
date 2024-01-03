import json
import random
from datetime import datetime, timedelta

# Constants for generating log entries
LEVELS = ["info", "warn", "error"]
SERVICES = ["authentication", "database", "monitoring"]
ENVIRONMENTS = ["production", "development"]
HOSTS = ["server1.example.com", "server2.example.com", "devserver.example.com"]
USERS = ["user123", "dbadmin", "devuser"]
STATUS_CODES = [200, 503, 401]
METHODS = ["POST", "GET"]
URLS = ["/api/login", "/api/data", "/api/status"]
ERROR_MESSAGES = {
    "info": "JSON file has been sent successfully.",
    "warn": " Update your configuration file to eliminate this warning.",
    "error": "Authentication connection failed."
}

# Function to generate a mock log entry
def generate_log_entry():
    timestamp = datetime.utcnow() - timedelta(days=random.randint(0, 30))
    timestamp_str = timestamp.strftime('%Y-%m-%dT%H:%M:%S') + '.' + timestamp.strftime('%f')[:3] + 'Z'
    level = random.choice(LEVELS)
    service = random.choice(SERVICES)
    environment = random.choice(ENVIRONMENTS)
    host = random.choice(HOSTS)
    user = random.choice(USERS)
    status_code = random.choice(STATUS_CODES)
    method = random.choice(METHODS)
    url = random.choice(URLS)
    message = ERROR_MESSAGES[level]

    log_entry = {
        "timestamp": timestamp_str,
        "level": level,
        "message": message,
        "service": service,
        "environment": environment,
        "host": host,
        "user": user,
        "statusCode": status_code,
        "method": method,
        "url": url
    }
    return log_entry

# Function to add a log entry to the JSON array in the log file
def add_to_json_array(log_entry, file_path='logs.json'):
    try:
        with open(file_path, 'r+') as file:
            logs = json.load(file)
            logs.append(log_entry)
            file.seek(0)
            file.truncate()
            json.dump(logs, file, indent=2)
    except (IOError, ValueError):
        with open(file_path, 'w') as file:
            json.dump([log_entry], file, indent=2)

# Generate and add a new log entry
new_log_entry = generate_log_entry()
add_to_json_array(new_log_entry)