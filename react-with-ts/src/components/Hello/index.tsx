import React from 'react'
interface IWithHello {
  message?: string
}
const Hello: React.FC<IWithHello> = function (props) {
  return (
    <div>
      {props.message}
    </div>
  )
}

Hello.defaultProps = {
  message: '你好，世界！'
}

export default Hello


