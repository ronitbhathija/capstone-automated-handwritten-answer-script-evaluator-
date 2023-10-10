import React from 'react';
import userprofilepic from '../assets/userprofilepic.jpg';

const Item5 = (props) => {
    // Access the passed user data from props
    const userData = props.tokenPayload;
    // console.log(userData);

    // Placeholder for the user's profile picture
    const profilePicture = "/path/to/your/image.jpg";

    return (
        <div className='flex flex-col justify-center items-center text-white h-full bg-gray-800'>
            <img src={userprofilepic} alt='User Profile' className='w-32 h-32 rounded-full mb-4' />
            <p className='text-xl mb-2'>{userData && userData.email}</p>
            <p className='text-lg mb-2'>{userData && userData.id}</p>
            <p className='text-lg mb-2'>{userData && userData.role}</p>
        </div>
    );
}

export default Item5;
