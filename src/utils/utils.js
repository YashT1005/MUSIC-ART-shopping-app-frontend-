import { createCart } from "../apis/data"

export const addToCart = async (e) => {
    const response = await createCart({ id: e })
    console.log(response)
}