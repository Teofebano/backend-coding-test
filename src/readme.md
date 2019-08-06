# Xendit Coding Exercise

The goal of these exercises are to assess your proficiency in software engineering that is related to the daily work that we do at Xendit. Please follow the instructions below to complete the assessment.

In this first exercise, the engineer needs to understand the product/service in a whole, and make a clear documentation out of it. After that, do a well defined PR so other engineer can understand the context of the PR, review, and drop some comments or feedbacks if needed.

## Endpoints
**1. Health check**<br />
> To check whether application is up and running properly

```json
POST /health
```

**2. Create ride**<br /> 
> To create a ride, with the following details


```json
POST /rides
```

**Request parameters**
Parameter | Description
--- | ---
start_lat|**number (required)**<br />The start latitude. Must be between -90 and 90
start_long|**number (required)**<br />The start latitude. Must be between -180 and 180
end_lat|**number (required)**<br />The start latitude. Must be between -90 and 90
end_long|**number (required)**<br />The start latitude. Must be between -180 and 180
rider_name|**string (required)**<br />The name of the rider. Must be a string that cannot be less than 1 in length
driver_name|**string (required)**<br />The name of the driver. Must be a string that cannot be less than 1 in length
driver_vehicle|**string (required)**<br />The name of the vehicle. Must be a string that cannot be less than 1 in length

**Response parameters**
Parameter | Description
--- | ---
rideID|**number (required)**<br />The ID of the request.
startLat|**number (required)**<br />The start latitude.
startLong|**number (required)**<br />The start latitude.
endLat|**number (required)**<br />The start latitude.
endLong|**number (required)**<br />The start latitude.
riderName|**string (required)**<br />The name of the rider.
driverName|**string (required)**<br />The name of the driver.
driverVehicle|**string (required)**<br />The name of the vehicle.


**3. Get all rides**<br /> 
> To get all created rides without any filter. Result is coming out as an array


```json
GET /rides
```

**Response parameters**
Parameter | Description
--- | ---
rideID|**number (required)**<br />The ID of the request.
startLat|**number (required)**<br />The start latitude.
startLong|**number (required)**<br />The start latitude.
endLat|**number (required)**<br />The start latitude.
endLong|**number (required)**<br />The start latitude.
riderName|**string (required)**<br />The name of the rider.
driverName|**string (required)**<br />The name of the driver.
driverVehicle|**string (required)**<br />The name of the vehicle.

**4. Get ride by id**<br /> 
> To get a specific ride by id. Result is coming out as an array (?)


```json
GET /rides/:id
```

**Response parameters**
Parameter | Description
--- | ---
rideID|**number (required)**<br />The ID of the request.
startLat|**number (required)**<br />The start latitude.
startLong|**number (required)**<br />The start latitude.
endLat|**number (required)**<br />The start latitude.
endLong|**number (required)**<br />The start latitude.
riderName|**string (required)**<br />The name of the rider.
driverName|**string (required)**<br />The name of the driver.
driverVehicle|**string (required)**<br />The name of the vehicle.