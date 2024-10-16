export const INSERT_USER = `
    INSERT INTO users (username, email, password, phone ,role) VALUES ($1,$2,$3,$4,$5)
    RETURNING *; 
    `;

export const GET_USER_BY_USERNAME: string = `
  SELECT * FROM users WHERE username = $1;
`;
export const GET_VEHICLES: string = `
  SELECT * FROM vehicle ;
`;
export const INSERT_VEHICLE = `
  INSERT INTO vehicle(vehicle_type, name, vehicle_status) VALUES ($1,$2,$3)
  RETURNING *;
`;

export const UPDATE_VEHICLE = `
  UPDATE vehicle
  SET vehicle_type = $1, name = $2, vehicle_status = $3
  WHERE vehicle_id = $4
  RETURNING *;
`;

export const GET_ALL_JOBS = `
  SELECT * 
  FROM booking b
  WHERE NOT EXISTS (
    SELECT 1 
    FROM booking_vehicle_relation bvr
    WHERE bvr.booking_id = b.id
  )
`;

export const FETCH_VEHICLE_ID = `
  SELECT v.id 
  FROM vehicle v
  JOIN booking b ON b.type = v.type
  WHERE b.id = $1
  LIMIT 1
`;

export const ACCEPT_JOB = `
  INSERT INTO booking_vehicle_relation (booking_id, vehicle_id, driver_id, status)
  VALUES ($1, $2, $3, 'accepted')
`;

export const SELECTED_BOOKING = `
  SELECT * 
  FROM booking b
  JOIN booking_vehicle_relation bvr ON b.id = bvr.booking_id
  WHERE bvr.driver_id = $1 
    AND b.status <> 'complete'
`;

export const CURRENT_LOCATION = `
INSERT INTO location_track (booking_id,latitude, longitude,timestamp)
VALUES ($1, $2, $3, $4)
`;

export const UPDATE_STATUS = `
  UPDATE booking_vehicle_relation 
  SET status = $2 
  WHERE booking_id = $1
`;

export const INSERT_BOOKING = `
  INSERT INTO public.booking (
    good_weight,
    good_type,
    vehicle_type,
    pickup_location_address,
    pickup_geolocation,
    dropoff_geolocation,
    dropoff_location_address,
    payment_status,
    graphhopper_response
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9
  )
`;
