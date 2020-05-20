import axios from 'axios'

export const getUserLocation = async () => {
  const res = await axios('https://extreme-ip-lookup.com/json/')
  console.log(res)
}