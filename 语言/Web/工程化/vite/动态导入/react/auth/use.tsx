import type { RegisterFormSchemaType } from "@/utils/schema/register"
import React, { useContext, useState, type PropsWithChildren } from "react"

// 可以用 context 存储 auth 状态来进行传递
function useRegisterInfo() {
  const [data, setData] = useState<RegisterFormSchemaType>({
    email: "",
    username: "",
    password: "",
  })

  return {
    data,
    async set(info: RegisterFormSchemaType): Promise<void> {
      setData(info)
    },
    clear() {
      setData({
        email: "",
        username: "",
        password: "",
      })
    },
  }
}

const RegisterInfoContext = React.createContext<ReturnType<typeof useRegisterInfo> | undefined>(undefined)

export function RegisterInfoProvider({ children }: PropsWithChildren<any>) {
  const register = useRegisterInfo()
  return <RegisterInfoContext.Provider value={register} children={children} />
}

export function useRegisterInfoContext() {
  return useContext(RegisterInfoContext)
}
