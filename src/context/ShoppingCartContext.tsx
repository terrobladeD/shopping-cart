import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
type ShoppingCartProviderProps = {
    children: ReactNode
}
type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setcartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])
    const [isOpen, setIsOpen] = useState(false)
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)


    function increaseQuantity(id: number) {
        setcartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseQuantity(id: number) {
        setcartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setcartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }



    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartQuantity,
            cartItems,
        }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}