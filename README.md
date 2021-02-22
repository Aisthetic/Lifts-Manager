# Lifts-Manager
## _Lifts handling made easy_

Lifts-Manager is a cloud-ready, offline-storage compatible,
Typescript and Express/MongoDB-powered server for managing your lifts.

## Features

- Roles with access authority
- Add as much elevators as you wish
- Async handling 
- Offline MongoDB database
- Docker ready tests and deployment
## Tech

Lifts-Manager uses a number of open source projects to work properly:

- [Typescript] - All that syntaxic sugar and typing, easy to maintain!
- [MongoDB] - Lightweight database for all usages
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Docker] - easy tests and deployment
- [jQuery] - duh

## Installation

* Install using Docker Compose [**Recommended Method**] 
    * Clone this repo.
    * Install Docker and Docker Compose. [Find Instructions Here](https://docs.docker.com/install/).
    * Execute `docker-compose up -d` in terminal from the repo directory.
    * You will be able to access the api from http://localhost:3000
    * *If having any issue* then make sure 3000 port is not occupied else provide a different port in **.env** file.
    * *If having any issue* then make sure 27017 port is not occupied else provide a different port in **.env** file.
 * Run The Tests
    * Install node.js and npm on your local machine.
    * From the root of the project executes in terminal `npm install`.
    * *Use the latest version of node on the local machine if the build fails*.
    * To run the tests execute `npm test`.

## API Examples
* Add lift
    * Method and Headers
    ```
    POST /v1/lift/add HTTP/1.1
    Host: localhost:3000
    x-api-key: GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
        "id" : "0",
    }
    ```
    * Response Body: 200
    ```json
    {
      "statusCode": "10000",
      "message": "Add Successful",
      "data": {
        "Lift": {
          "_id": "d5s52yh12jjk13",
          "id": "0",
          "floor": "0",
          "direction" : "UP",
          "state": "IDLE"
        }
      }
    }
    ```
    * Response Body: 400
    ```json
    {
      "statusCode": "10001",
      "message": "Bad Api-Key"
    }
    ```

## Development

The projet is still in It's very early phases, adding lifts unit tests work fine, however the management part isn't thoroughly tested yet. The writing of the unit tests is in progress.
