import axios from 'axios'

const baseURL = axios.create({baseURL:"https://tandinshop-server.vercel.app/"})
export default baseURL