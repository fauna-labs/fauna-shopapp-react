if (!process.env.REACT_APP_API_BASE_URL) {
  throw new TypeError('Missing "REACT_APP_API_BASE_URL" env variable')
}

export const { REACT_APP_API_BASE_URL: API_BASE_URL } = process.env
