import {FC} from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

interface CustomLinkProps {
  className: string
  to: string
  activeClass: string
}

export const CustomLink : FC<CustomLinkProps> = ({ children, to, className, activeClass}) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })
  return (
    <Link
      className={`${className} ${match ? activeClass : ''}`}
      to={to}
    >
      {children}
    </Link>
  )
}