import React from "react"

const AuthContext = React.createContext<boolean | undefined>(false)
// ! 无法全局使用，最好还是使用 redux
// 可以用 context 存储 auth 状态来进行传递
export function useAuth() {
  const [authed, setAuthed] = useState<boolean>() //状态

  return {
    //认证状态
    authed,
    //登录
    async login(username: string, password: string): Promise<void> {
      setAuthed(true)
    },
    //退出
    logout() {
      setAuthed(false)
    },
  }
}

export function AuthProvider({ children }) {
  const auth = useAuth()
  return <AuthContext.Provider value={auth.authed}>{children}</AuthContext.Provider>
}

export default function AuthConsumer() {
  return useContext(AuthContext)
}
