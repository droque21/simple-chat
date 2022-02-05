import { ChangeEvent, useState } from 'react'


export function useInput<Type> (initialValue: Type) : [Type, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState<Type>(initialValue)
  
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(prevVal => ({...prevVal, [e.target.id]: e.target.value}))
  }

  return [
    value,
    changeHandler
  ]
}
