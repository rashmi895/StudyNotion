import React from 'react'
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../Components/Core/HomePage/HighlightText.jsx"
import CTAButton from '../Components/Core/HomePage/Button.jsx';
import study from "../assets/Videos/study.mp4";
import CodeBlocks from '../Components/Core/HomePage/CodeBlocks.jsx';
import ExploreMore from '../Components/Core/HomePage/ExploreMore.jsx';
import Navbar from '../Components/Common/Navbar.jsx';
const Home = () => {
  return (
    <div className='flex flex-col items-center'>
      <div>
        <Navbar></Navbar>
      </div>
      {/* Section 1 */}
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
      text-amber-400 justify-between'>
        {/* Top Button */}   
        <Link to={"/signup"}>
          <div className=' group mt-16 p-1 mx-auto rounded-full bg-white font-bold text-richblack-200
          transition-all duration-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:scale-95 w-fit hover:drop-shadow-none'>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
            transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
      </div>

      {/* heading 1*/}
      <div className='text-center text-4xl font-semibold mt-7 text-white'>
        Empower Your Future with
        <HighlightText text={"Coding Skills"} />
      </div>

      {/* intro */}
      <div className='mt-3 w-[60%] text-center text-lg font-bold text-white'>
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
      </div>
            {/* Buttons */}
            <div className='flex flex-row gap-7 mt-8'>
              
                <CTAButton active={true} linkto={"/signup"}> 
                    Learn More
                </CTAButton>
              

                <CTAButton active={false} linkto={"/login"}> 
                    Book a Demo
                </CTAButton>
            </div>

            {/* Banner or video */}
            <div className='mx-5 my-10 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <video className=' w-full max-w-[1300px] shadow-[15px_15px_rgba(255,255,255)]'
                muted 
                loop
                autoPlay
                >
                <source  src={study} type="video/mp4" />
                </video>
            </div>

            {/* CodeBlocks 1 */}

               <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-white text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={"coding potential "}/>
                            with our online courses.
                        </div>
                    }
                    subheading = {
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
                     codeColor={"text-yellow-25"}
                />
            </div>

 {/* CodeBlocks 2 */}

               <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-white text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={"coding in seconds "}/>
                            
                        </div>
                    }
                    subheading = {
                          "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                     codeColor={"text-yellow-25"}
                />
            </div>

            <div>
              <ExploreMore></ExploreMore>
            </div>
                    {/* Section2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
                    
            {/* buttons and criss-cross background */}
            <div className='homepage_bg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='hidden lg:block h-[180px]'></div>
                    <div className=' mt-8 lg:mt-0 flex flex-row gap-7 text-white '>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3' >
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                            
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>

                </div>
            </div>
</div>
    </div>
  )
}

export default Home;
 