#!/bin/bash

echo "Running on ${PATH} path"

sleep 1

python3 /usr/src/logs.py

sleep 7

sh /usr/src/init.sh

echo "Commands ran successfully"
