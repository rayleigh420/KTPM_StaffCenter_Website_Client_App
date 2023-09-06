import { Button } from "antd"
import axios from "../utils/axios"
import { getAddress } from "./mapAPI"

export const bookDirect = async (data) => {
    const result = await axios.post('/booking/request-ride', data)
    return result.data
}

export const getHistory = async (phone) => {
    const result = await axios.post('booking/getLocations', phone)
    const history = []

    result.data = result?.data?.map(async (item) => {
        const startAddress = await getAddress(item.startLocation)
        const endAddress = await getAddress(item.endLocation)

        history.push({
            startAddress: startAddress,
            endAddressd: endAddress
        })
        console.log(startAddress, endAddress)
        return {...item, startAddress, endAddress}
    })

    // await Promise.all(getAllAddress)
    return result.data
}

export const getAllWaiting = async () => {
    const result = await axios.get('/booking/getBookingPositions')
    const waiting = result.data.data?.map((item, index) => {
        return {
            stt: index,
            time: '9:00 AM - 18/08/2023',
            phoneNumber: item.phoneNumber,
            status: "Kiem tra"
        }
    })
    
    return waiting
}