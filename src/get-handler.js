import jwt from "jsonwebtoken";
import { categories } from "./categories";

export const get = async event => {
  const token = event.headers.Authorization;
  if (!token) {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
  }
  try {
    jwt.verify(token.replace("Bearer ", ""), process.env.jwtSecret);
    // TODO: make this more multi-tenant friendly
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=300",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(categories)
    };
  } catch (error) {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
  }
};
