// import React from 'react'

// const Contact = () => {
//     return (
//         <div className='flex justify-center items-center text-white text-3xl h-full'>
//             Contact
//         </div>
//     )
// }

// export default Contact




import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to backend)
        console.log("Form submitted with data:", formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  to-indigo-800">
            <div className="bg-white p-8 rounded-lg shadow-xl w-3/4 md:w-1/2 lg:w-1/3 transform transition-transform duration-300 hover:scale-105">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">Get in Touch</h2>
                <p className="text-gray-600 mb-6">We'd love to hear from you! Please fill out the form below and we'll be in touch soon.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 sr-only">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="mt-1 p-2 w-full border border-transparent rounded-md pl-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400" />
                        <span className="absolute left-3 top-4 text-gray-400">
                            <i className="fas fa-user"></i>
                        </span>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 sr-only">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="mt-1 p-2 w-full border border-transparent rounded-md pl-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400" />
                        <span className="absolute left-3 top-4 text-gray-400">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-600 sr-only">Message</label>
                        <textarea rows="6" id="message" name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Message" className="mt-1 p-2 w-full border border-transparent rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"></textarea>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-2 rounded-md hover:from-purple-600 hover:to-indigo-700">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;
