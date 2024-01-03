#!/bin/bash

FILE="/usr/src/logs.py"

# Check if program exists in the container
if [ -f "$FILE" ]; then
    echo "File Exists, executing Python script"
    python "$FILE"
    if [ "$?" -ne 0 ]; then
        echo "Python script execution failed."
        exit 1
    fi
else
    echo "File is missing, please check destination"
    exit 1
fi

echo "Executing POST request of logs file"
sleep 2

curl -X POST -H "X-Source-Identifier: VM1" -H "Content-Type: multipart/form-data" -F "logFile=@logs.json;type=application/json" http://192.168.56.12:5000/logs

if [ "$?" -ne 0 ]; then
    echo "Something went wrong, please verify content"
else
    echo "Post completed successfully"
fi

