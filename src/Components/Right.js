import React from 'react'
import { Image } from 'react-bootstrap'
import image1 from '../images/image2.jpg'
function Right() {
  return (
    <div className="container">
      <Image
        src={image1}
        style={{ width: '80%', marginTop: '5%', border: 'none' }}
      />
    </div>
  )
}

export default Right
