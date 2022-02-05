import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const PREFIX = 'simple-chat-'

declare type useLocalStorageReturn<Type> = [Type | null, Dispatch<SetStateAction<Type | null>>]

export function useLocalStorage<Type> (key: string, initialValue?: Type) : useLocalStorageReturn<Type> {
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState<Type|null>(()=>{
    const jsonValue = localStorage.getItem(prefixedKey)
    if(jsonValue) return JSON.parse(jsonValue) as Type
    if(initialValue) return initialValue
    return null
  })

  useEffect(() => {
    if(value !== null)
      localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [value])
  
  return [value, setValue]
}
