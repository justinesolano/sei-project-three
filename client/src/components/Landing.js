import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Reveal } from 'semantic-ui-react'
import smileyBlue from '../assets/smileyfaceblue.jpg'
import smileyYellow from '../assets/smileyfaceyellow.jpg'
import smileyGreen from '../assets/smileyfacegreen.jpg'

const Landing = () => {


  return (
    <div>
      <div className="landing ui grid">
        <Link to="/login">
          <Reveal animated='fade' className="column">
            <Reveal.Content visible>
              <Image src='https://miro.medium.com/max/400/1*7c5wdOe8QXTgw_tfUi11rA.png' size='small' />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Image src={smileyBlue} size='small' />
            </Reveal.Content>
          </Reveal>
        </Link>
        <Link to="/register">
          <Reveal animated='fade' className="column">
            <Reveal.Content visible>
              <Image src='https://i1.wp.com/sbo2com.net/wp-content/uploads/2018/10/register-icon.png?ssl=1' size='small' />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Image src={{smileyYellow}} size='small' />
            </Reveal.Content>
          </Reveal>
        </Link>
        <Link to="/home">
          <Reveal animated='fade' className="column">
            <Reveal.Content visible>
              <Image src='https://www.computerhope.com/jargon/g/guest-user.jpg' size='small' />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Image src={smileyYellow} size='small' />
            </Reveal.Content>
          </Reveal>
        </Link>
      </div>
      
    </div>
  )
}

export default Landing