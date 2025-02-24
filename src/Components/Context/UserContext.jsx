import { createContext, useState } from "react"

export let UserContext = createContext()

export default function UserContextProvider(props) {
    const [token, settoken] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
)

    return <UserContext.Provider value={{token,settoken}}>
      {props.children}
  </UserContext.Provider>
}
