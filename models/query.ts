export const INSERT_USER = `
    INSERT INTO users (username, email, password, phone ,role) VALUES ($1,$2,$3,$4,$5)
    RETURNING *; 
    `;

export const GET_USER_BY_USERNAME: string = `
  SELECT * FROM users WHERE username = $1;
`;
