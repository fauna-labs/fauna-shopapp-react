import axios from 'axios'
import { API_BASE_URL } from '../config'

let mutableApiClient = axios.create({
  baseURL: API_BASE_URL,
})

export const apiClient = () => mutableApiClient

export const signInApiClient = ({
  authorization,
}: Record<'authorization', string>) => {
  mutableApiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      authorization,
    },
  })
}

export const signOutApiClient = () => {
  mutableApiClient = axios.create({
    baseURL: API_BASE_URL,
  })
}
