const DEV = {
  BASE_URL: 'http://localhost:8080',
}

const PROD = {
  BASE_URL: 'https://api.zqskate.com',
}

export const API = process.env.NODE_ENV === "production" ? PROD : DEV;
