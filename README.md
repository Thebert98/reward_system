# Reward System

The Reward System is a Node.js-based application designed to manage and distribute rewards. This system leverages Redis for data storage and includes Docker support for easy deployment.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
## Installation

### Prerequisites

- Node.js (v14 or higher)
- Docker (optional, for containerized deployment)
- Redis

### Steps

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd reward_system
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables:
    - Copy the `.env.example` file to `.env` and update the variables accordingly:
    ```bash
    cp .env.example .env
    ```

4. Start the Redis server:
    ```bash
    redis-server
    ```

## Usage

### Running Locally

To run the application locally, use the following command:
```bash
npm start
```

### Running with Docker

To run the application using Docker, follow these steps:

1. Build the Docker image:
    ```bash
    docker compose build
    ```

2. Start the containers using Docker Compose:
    ```bash
    docker compose up
    ```

## Configuration

The application configuration is managed through environment variables. Update the `.env` file with the appropriate values.

### Environment Variables

- `PORT`: The port on which the application will run (default: 3000).
- `REDIS_HOST`: The Redis server hostname.
- `REDIS_PORT`: The Redis server port.
- `REDIS_PASSWORD`: The password for Redis (if applicable).

## Endpoints

### Base URL

```
http://localhost:3100
```