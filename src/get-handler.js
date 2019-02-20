import jwt from "jsonwebtoken";
import { categories } from "./categories";

export const get = async event => {
  const token = event.headers.Authorization;
  if (!token) {
    return {
      statusCode: 401
    };
  }
  try {
    jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    // TODO: make this more multi-tenant friendly
    return {
      statusCode: 200,
      headers: {
        "cache-control": "max-age=300"
      },
      body: JSON.stringify(categories)
    };
  } catch (error) {
    return {
      statusCode: 401
    };
  }
};
