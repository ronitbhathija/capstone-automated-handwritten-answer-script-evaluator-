// import React from 'react'

// const About = () => {
//     return (
//         <div className='flex justify-center items-center text-white text-3xl h-full'>
//             About
//         </div>
//     )
// }

// export default About




import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const About = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    return (
        <div className='flex flex-col justify-center items-center p-8 h-full'>
            <h1 className='text-black text-5xl mb-8 font-bold'></h1>

            {/* Carousel */}
            <Slider {...settings} className='w-full md:w-2/3 mb-8'>
                <img src='../images/aimg1.jpg' alt='Image 1' className='w-full h-auto' />
                <img src='../images/aimg2.jpg' alt='Image 2' className='w-full h-auto' />
                <img src='../images/aimg3.jpg' alt='Image 3' className='w-full h-auto' />
                <img src='../images/aimg4.jpg' alt='Image 4' className='w-full h-auto' />
            </Slider>

            {/* About Summary */}
            <p className='text-black text-xl max-w-2xl text-center bg-white p-8 rounded-lg shadow-xl'>
                At Smart-Eval, we're revolutionizing the educational assessment landscape. Our state-of-the-art Automated Answer Script Evaluation system empowers educators by automating the grading process. By simply providing an answer key and student responses, teachers can swiftly receive accurate grading results. This not only ensures consistency and precision but also significantly reduces the time spent on manual grading. Dive into the future of assessment with us and experience efficiency like never before.
            </p>
        </div>
    )
}

export default About;
