import React, {useEffect, useState} from 'react'
import './home.css'
import {Link} from 'react-router-dom'
import { BiLinkExternal, BiStar } from 'react-icons/bi'
import data from '../../data.json'
import Marquee from 'react-double-marquee'
import {useSelector} from 'react-redux'


function Home() {

  const{user} = useSelector((state) => state.auth)
  return (
    <div className='home-container'>
      <div className="hero-section">
        <div className="hero-left">
          {/* https://uiverse.io/alexmaracinaru/empty-moose-12 */}
        <Link class="cta" to="/products">
        <span class="hover-underline-animation"> Shop now </span>
        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
        <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
        </svg>
      </Link>
        </div>
        <div className="hero-right">
          <img src="./images/home.jpg" className='hero-image'/>
        </div>
      </div>
      <div className="home-divider">
        <Marquee>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quasi molestiae eligendi blanditiis! Quia inventore consequuntur temporibus officiis, consectetur, odio corporis asperiores nemo possimus nam reiciendis minima animi fuga repellendus iusto veniam fugiat impedit consequatur sapiente aliquam sint! Blanditiis reprehenderit a quo eum illo nobis voluptas in eos suscipit aliquid?
        </Marquee>
      </div>
      <div className="home-body">
       <div className="home-section">
        <div className="home-section-left">
          <img className='home-section-img' src="./images/clothing.jpg"/>
        </div>
        <div className="home-section-right">
          <div className="home-section-title">Make a <span className='home-section-emphasis'>Statement.</span></div>
          <div className="home-section-links">Shop <Link to="/products" className='home-section-link'>Clothing <BiLinkExternal /></Link></div>
        </div>
       </div>
       <div className="home-section">
       <div className="home-section-left">
       <img className='home-section-img' src="./images/jewelry.jpg"/>
       </div>
        <div className="home-section-right">
        <div className="home-section-title">Be <span className='home-section-emphasis'>Bold.</span></div>
        <div className="home-section-links">Shop <Link to="/products" className='home-section-link'>Jewelry <BiLinkExternal /></Link></div>
        </div>
       </div>
       <div className="home-section">
       <div className="home-section-left">
       <img className='home-section-img' src="./images/home-two.jpg"/>
       </div>
        <div className="home-section-right">
        <div className="home-section-title">Be <span className='home-section-emphasis'>You.</span></div>
        <div className="home-section-links">Shop <Link to="/products" className='home-section-link'>All <BiLinkExternal /></Link></div>
        </div>
       </div>
      </div>
      <>
        {!user ? (
          <div className="home-signup">
          <div className="signup-text">Become a Nozama Member Today and Save 25% on Your Next Purchase</div>
          <span className='signup-link-wrapper'><Link to="/register" className='signup-link'>Sign Up</Link> Today</span>
          </div>
        ) : (
         ""
        )}
        
      </>
      <div className="home-end">
        <div className="home-recent-releases">
          <div className="home-releases-title">Recent Releases</div>
          <div className="home-releases">
            <div className="home-release">
              <>
              {data ? <img className='home-release-img' src={data[2].image}/> : ''}
              </>
              <div className="home-release-overlay">
                <div className="release-overlay-title">{data[2].title}</div>
                <div className="release-overlay-main">
                <div className="release-overlay-price">${data[2].price}</div>
                <div className="release-overlay-rating">{data[2].rating.rate} <BiStar /></div>
                </div>
              </div>
            </div>
            <div className="home-release">
            <>
            {data ? <img className='home-release-img' src={data[4].image}/> : ''}
            </>
            <div className="home-release-overlay">
                <div className="release-overlay-title">{data[4].title}</div>
                <div className="release-overlay-main">
                <div className="release-overlay-price">${data[4].price}</div>
                <div className="release-overlay-rating">{data[4].rating.rate} <BiStar /></div>
                </div>
            </div>
            </div>
            <div className="home-release">
            <>
            {data ? <img className='home-release-img' src={data[10].image}/> : ''}
            </>
            <div className="home-release-overlay">
                <div className="release-overlay-title">{data[10].title}</div>
                <div className="release-overlay-main">
                <div className="release-overlay-price">${data[10].price}</div>
                <div className="release-overlay-rating">{data[10].rating.rate} <BiStar /></div>
                </div>
            </div>
            </div>
          </div>
        </div>
        {/* <hr className='home-hr'/> */}
        <div className="home-social-media">
          <div className="home-social-media-title">Styled by You</div>
          <div className="home-social-media-hashtag">#nozama</div>
          <div className="home-social-media-main">
            <div className="home-social-media-post" >
            <img className='social-media-post' src="./images/insta_1.jpg"/>
            </div>
            <div className="home-social-media-post">
            <img className='social-media-post'src="./images/insta_2.jpg"/>
            </div>
            <div className="home-social-media-post">
            <img className='social-media-post'src="./images/insta_3.jpg"/>
            </div>
            <div className="home-social-media-post">
            <img className='social-media-post'src="./images/insta_4.jpg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home