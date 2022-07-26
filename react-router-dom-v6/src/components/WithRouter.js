import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function WithRouter(Componet) {
  return function (props) {
    // 在react18中无法使用了
    // const push = useNavigate();
    // const location = useLocation();
    // const match = useParams();
    return <Componet {...props} /* history={{ push, location, match }} */></Componet>
  }
}

export default WithRouter