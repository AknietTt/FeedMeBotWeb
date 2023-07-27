import React from 'react'

function Restaurant({restaurantId , name}) {
  return (
    <div>{restaurantId}
      <div>{name}</div>
    </div>
    
  )
}

export default Restaurant