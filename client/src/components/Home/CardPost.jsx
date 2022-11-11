import React from 'react'
import { Link } from 'react-router-dom'
import {BiCommentDetail} from 'react-icons/bi'
import {AiFillHeart} from 'react-icons/ai'
import {getTimeAgo} from '../../utils'
import {AiOutlineHeart} from 'react-icons/ai'

const CardPost = ({image, author, content, likes, createdAt, comments}) => {
  const [like, setLike] = React.useState(false)

  const toggleLike = () => {
    setLike(!like)
    likes = like ? likes - 1 : likes + 1
    console.log(likes)
  }
  
  if(!image) {
    image = 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/kittens-in-shelter-69469.jpg?h=ece64c50&itok=tOiKeqHY'
  }

  // const dateFormat = createdAt.split('T')[0].split('-').reverse().join('/')
  
  return (
    <div className='flex flex-col'>
      <div className="w-[100%] max-w-xl my-4 md:min-w-[500px] bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex items-start px-4 py-6">
          <img className="object-cover mr-4 rounded-full shadow w-14 h-14" src={image} alt="avatar"/>
        <div className="">
          <Link to='/:ongId/profile' className="object-cover w-12 h-12 mr-4 rounded-full shadow">
        <div className="flex flex-col items-start">
            <h2 className="-mt-1 text-lg font-semibold text-gray-900">{author}</h2>
          <small className="px-2 py-1 text-sm text-gray-700 rounded-md bg-slate-200">{getTimeAgo(createdAt)}</small>
        </div>
          </Link>
        <p className="text-sm text-left text-gray-700">
          {content}
        </p>
        <div className="flex items-center mt-4">
          <div className="flex mr-4 text-sm text-gray-700">
            {
                like
                ? <button className='flex flex-row' onClick={toggleLike}>
                    <AiFillHeart className='w-5 h-5'/>
                    <span>{likes}</span>
                  </button>
                : <button className='flex flex-row' onClick={toggleLike}>
                    <AiOutlineHeart className='w-5 h-5'/>
                    <span>{likes}</span>
                  </button>
              }
            </div>
            <div className="flex mr-2 text-sm text-gray-700">
              <Link to='/post/:postId' className='flex flex-row pr-4'>
                <BiCommentDetail className='w-5 h-5'/>
                <span>{comments}</span>
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPost