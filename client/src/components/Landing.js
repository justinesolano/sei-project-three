import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Reveal } from 'semantic-ui-react'
import smileyBlue from '../assets/smileyfaceblue.jpg'
import smileyYellow from '../assets/smileyfaceyellow.jpg'
import smileyGreen from '../assets/smileyfacegreen.jpg'
import registerImageShadow from '../assets/redregisterimagewithshadow.jpg'
import loginImageShadow from '../assets/redloginimagewithshadow.jpg'
import guestImageShadow from '../assets/redguestimagewithshadow.jpg'

const Landing = () => {

  return (
    <div className="landing ui grid">
      <Link to="/login">
        <Reveal animated='fade' className="column">
          <Reveal.Content visible>
            <Image src={loginImageShadow} size='big' />
          </Reveal.Content>
          <Reveal.Content hidden>
            <Image src={smileyBlue} size='small' />
          </Reveal.Content>
        </Reveal>
      </Link>
      <Link to="/register">
        <Reveal animated='fade' className="column">
          <Reveal.Content visible>
            <Image src={registerImageShadow} size='big' />
          </Reveal.Content>
          <Reveal.Content hidden>
            <Image src={smileyYellow} size='small' />
          </Reveal.Content>
        </Reveal>
      </Link>
      <Link to="/home">
        <Reveal animated='fade' className="column">
          <Reveal.Content visible>
            <Image src={guestImageShadow} size='big' />
          </Reveal.Content>
          <Reveal.Content hidden>
            <Image src={smileyGreen} size='small' />
          </Reveal.Content>
        </Reveal>
      </Link>
    </div>
  )
}

export default Landing