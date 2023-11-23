import { useEffect } from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <main  className=" w-full h-screen overflow-hidden flex bg-background text-text flex-col justify-center items-center">
        <img className=" w-60 h-60" alt="Not Found" src="/images/notFound.png"/>
        <h1 className=" text-2xl mb-3">Page Not Found</h1>
        <p>Go to <Link to={'/'} className=" text-accent underline py-2">Home</Link></p>
    </main>
  )
}

export default NotFound