const DEV = {
  BASE_URL: 'http://localhost:9090',
}

const PROD = {
  BASE_URL: 'https://api.zqskate.com',
}

export const API = process.env.NODE_ENV === "production" ? PROD : DEV;
