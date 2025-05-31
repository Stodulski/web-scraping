import axios from "axios"
import { client } from "../axiosAgent.js"

const getPenRate = async()=> {
  const response = await client.get(
    'https://api.exchangerate-api.com/v4/latest/USD'
  )
  const usdToPenRate = response.data.rates.ARS
  return usdToPenRate
}
export default getPenRate
