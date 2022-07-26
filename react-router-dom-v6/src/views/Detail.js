import React from 'react'
import { useNavigate,/* useSearchParams, */ useParams } from 'react-router-dom';

function Detail() {
  // let [searchParams, setSearchParams] = useSearchParams();
 
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(id);
  return (
    <div>Detail
      {/* setSearchParams 用途一般是继续跳转到当前页面，而参数改变的情况，比如猜你喜欢，从一个产品详情，跳转到推荐的其他产品详情中去 */}
      {/* <button onClick={() => { setSearchParams({id:123}) }}>猜你喜欢</button> */}
      <button onClick={() => { navigate(`/detail/123`) }}>猜你喜欢</button>
    </div>
  )
}

export default Detail