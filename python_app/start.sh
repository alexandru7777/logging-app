#!/bin/bash

echo "Running on ${PATH} path"

sleep 1

cd /usr/src/

echo "New ${PATH} executed"

python3 logs.py

sleep 2

sh init.sh

echo "Commands ran successfully"
