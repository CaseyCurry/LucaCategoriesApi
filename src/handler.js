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
    jwt.verify(token, process.env.JWT_SECRET);
    return {
      statusCode: 200,
      body: JSON.stringify(categories)
    };
  } catch (error) {
    return {
      statusCode: 401
    };
  }
};
