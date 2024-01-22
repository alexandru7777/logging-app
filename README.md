CI/CD Logging App Deployment


The main focus of the project is to prepare a ground basis automation for Vm-based microservices

The microservices consist of: 
  1. Python application that generates dummy entries into a .json file
  2. 2 Bash scripts used for starting the Python app (through cronjob) and send a POST request with the newly created data from json file
  3. React + Vite Frontend - in which the logs are displayed and filtered (fetches from backend app) + Login Page
  4. ExpressJS App that connects to MongoDB Atlas - receives data from the POST request and processes it accordingly - implements an AUTH login with a predetermined username and password

Therefore the app will be running on 3 containers in the same network:
  1. Dockerfile for Python app - which will be composed out of a Debian image + packages to execute the scripts as well
  2. Dockerfile for Backend - where will be running the express app
  3. Dockerfile for Frontend - which is made out of 2 images - a node image used to build the react app and an nginx image used to upload our built react app

Those images will be deployed using docker-compose; Further, the application will be deployed in the following schema:

  project is uploaded/created in git --> linked to Jenkins (needs Build Pipeline - Pipeline script from SCM)

  .env file is uploaded in Jenkins as a secret file (.env for backend)

  After pipeline configuration is done, Jenkins will be using Ansible (preinstalled on the Jenkins host) to deploy the application on a remote host

  After deployment success, the application can be accessed according with the host's IP / domain name

  
