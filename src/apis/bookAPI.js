import axios from "../utils/axios"

export const bookDirect = async (data) => {
    const result = await axios.post('/booking/request-ride', data)
    return result.data
}

export const getHistory = async (phone) => {
    const result = await axios.post('booking/getLocation')
    return result.data
}