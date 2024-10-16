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
