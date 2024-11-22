# Use an official Python runtime as a parent image
FROM python:3.9.20-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt to the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Set the default command to run the Flask app
CMD ["python", "server.py"]