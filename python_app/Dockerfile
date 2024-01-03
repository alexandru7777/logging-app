# Use a Debian base image
FROM debian:latest

WORKDIR /usr/src/

# Install Python 3 and cron, then clean up
RUN apt-get update && \
    apt-get install -y python3 cron && \
    apt-get install -y curl vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Add your scripts to the container
COPY logs.py /usr/src/logs.py
COPY init.sh /usr/src/init.sh

# Make sure the scripts are executable
RUN chmod +x /usr/src/logs.py /usr/src/init.sh

# Create a json file inside the container
RUN touch /usr/src/logs.json

# Add a cron job
RUN echo "*/10 * * * * root sh /usr/src/init.sh >> /var/log/cron.log 2>&1" >> /etc/cron.d/logg_app

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/logg_app

# Apply cron job
RUN crontab /etc/cron.d/logg_app

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the command on container startup
CMD cron && tail -f /var/log/cron.log
