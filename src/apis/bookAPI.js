import axios from "../utils/axios"
import { getAddress } from "./mapAPI"

export const bookDirect = async (data) => {
    const result = await axios.post('/booking/request-ride', data)
    return result.data
}

export const getHistory = async (phone) => {
    const result = await axios.post('booking/getLocations', phone)
    const history = []

    const getAllAddress = result?.data?.map(async (item) => {
        const startAddress = await getAddress(item.startLocation)
        const endAddress = await getAddress(item.endLocation)

        history.push({
            startAddress: startAddress,
            endAddressd: endAddress
        })
        console.log(startAddress, endAddress)
        return {...item, startAddress, endAddress}
    })

    await Promise.all(getAllAddress)
    return result.data
}