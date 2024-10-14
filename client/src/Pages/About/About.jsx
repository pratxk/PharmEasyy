import React from 'react'
import Heading from '../../components/Skeleton/Heading'

function About() {
  return (
    <>
      <div className='overflow-hidden p-10'>
        <Heading
          text={"About Us"}
          textColor={"primary"}
          fromGradient={"secondary"}
          toGradient={"primary"}
        />

        <div class="sm:flex items-center max-w-screen-xl">
          <div class="sm:w-1/2 p-10">
            <div class="image object-center text-center">
              <img src="https://i.imgur.com/WbQnbas.png"/>
            </div>
          </div>
          <div class="sm:w-1/2 p-5">
            <div class="text">
              <span class="text-gray-500 border-b-2 border-black uppercase">About us</span>
              <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">About <span class="text-red-600">Our Company</span>
              </h2>
              <p class="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, commodi
                doloremque, fugiat illum magni minus nisi nulla numquam obcaecati placeat quia, repellat tempore
                voluptatum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About