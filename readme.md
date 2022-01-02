# Parking-lot

Node JS project with express

# Description

Parking lot system.

# Prerequisite

- Node


# Installaton

- npm install
- Make changes in default.js for configuring mongodb username and password,
- npm run migrate (Will create slots)
- Import postman from the postman folder

# Running
- Open console and run below command.
  #### `npm start`

## API descriptions

## User Routes

  #### `/api/user/register`
  - To create new Users

  #### `/api/user/login`
  - To login and get auth token.

## Parking Routes

  #### `/api/parking/slots`
  - To get all the slots

  #### `/api/parking/slots-occupied` 
  - To get all the occupied slots

  #### `/api/parking/reserve-slot`
  - To reserved a slot
  - Requires auth token

  #### `/api/parking/occupy-slot`
  - To occupy booked slot
  - Requires auth token

  #### `/api/parking/free-slot`
  - To free booked or reserved slot
  - Requires auth token


