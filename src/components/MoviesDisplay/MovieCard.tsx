import { Link } from "react-router-dom"

type Props = {
    id:number,
    image:string
}

const MovieCard = ({id,image}:Props) => {
  return (
    <Link className=" w-full h-full " to={`/watch/${id}`}>
      <img alt='Movie Name' loading='lazy' className=' object-cover w-full  h-[80%] transition-all duration-500 ' src={image}/>
      <h2 className=" text-text text-xl font-semibold mt-3 line-clamp-2">Zack Snyder's Justice League</h2>
      <p className="text-gray-400">Movie/Action</p>
    </Link>
  )
}

export default MovieCard