import { useRouter } from 'next/router'
import Link from 'next/link'
 
function Route({ children, href, style }) {
  const router = useRouter()
 
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }
 
  return (
    <Link href={href} onClick={handleClick} style={style} >
        {children}
    </Link>
    )
}
 
export default Route