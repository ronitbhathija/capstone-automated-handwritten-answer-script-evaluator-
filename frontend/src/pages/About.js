import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import axios from 'axios';


const About = (props) => {
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

    const reviewSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,  // Display two reviews at once
        slidesToScroll: 2,  // Scroll two reviews at a time
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true
    };

    const token = props.token;

    const [userData, setUserData] = useState([]);
    const [expandedReview, setExpandedReview] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/getallreviews').then(response => {
            setUserData(response.data);
        }).catch(err => {
            console.log("error fetching data", err);
        })
    }, []);



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


            {/* Reviews Heading */}
            <h2 className='text-2xl font-bold text-blue-700 mt-6 mb-4'>Reviews</h2>

            {/* Reviews Slider */}
            <Slider {...reviewSettings} className='w-full md:w-3/4 mt-8'>
                {userData.map((user, index) => (
                    <div key={index} className='p-4'>
                        <div className='bg-blue-100 p-6 shadow-lg rounded-lg'>
                            <h2 className='text-xl font-bold mb-2 text-blue-800'>{user.firstname} {user.lastname}</h2>
                            <p className='text-md mb-4 italic text-blue-600'>{user.role}</p>
                            <div
                                className={`relative overflow-hidden ${expandedReview === index ? '' : 'max-h-60'}`}
                                style={{ lineHeight: '1.5', maxHeight: expandedReview === index ? 'none' : '75vh' }}>
                                {user.review}
                            </div>
                            {user.review.split('\n').length > 50 && (
                                <button
                                    className='mt-4 text-blue-500'
                                    onClick={() => setExpandedReview(expandedReview === index ? null : index)}>
                                    {expandedReview === index ? 'Read Less' : 'Read More'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </Slider>

        </div>
    )
}

export default About;
