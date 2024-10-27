import React, { useState } from 'react';
import { Link, useToast } from '@chakra-ui/react';
import Heading from '../../components/Skeleton/Heading';
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contacts() {
  const toast = useToast();
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({ name: '', email: '', subject: '', message: '' });

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEB3_ACCESSKey);

    const validationErrors = validateForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_WEB3_FORM, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success!",
          description: "Form Submitted Successfully!",
          status: "success",
          duration: 1400,
          isClosable: true,
          position: 'bottom-right'
        });
        event.target.reset();
        setFormValues({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        toast({
          title: "Error!",
          description: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("Error:", error);
      toast({
        title: "Error!",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const validateField = (name, value) => {
    const newErrors = {};
    const namePattern = /^[a-zA-Z\s]*$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const subjectPattern = /^[a-zA-Z0-9\s]*$/;
    const messagePattern = /^[a-zA-Z0-9\s]*$/;

    if (name === 'name') {
      if (!value) newErrors.name = 'Name is required.';
      else if (!namePattern.test(value)) newErrors.name = 'Name should not contain special characters.';
    }

    if (name === 'email') {
      if (!value) newErrors.email = 'Email is required.';
      else if (!emailPattern.test(value)) newErrors.email = 'Invalid email format.';
    }

    if (name === 'subject') {
      if (!value) newErrors.subject = 'Subject is required.';
      else if (!subjectPattern.test(value)) newErrors.subject = 'Subject should not contain special characters.';
    }

    if (name === 'message') {
      if (!value) newErrors.message = 'Message is required.';
      else if (value.split(' ').length > 100) newErrors.message = 'Message must be 100 words or less.';
      else if (!messagePattern.test(value)) newErrors.message = 'Message should not contain special characters.';
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

    const fieldErrors = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrors[name] }));
  };

  return (
    <div className='overflow-hidden p-4'>
      <Heading
        text={"Contact Us"}
        textColor={"primary"}
        fromGradient={"secondary"}
        toGradient={"primary"}
      />
      <div className="mt-6">
        <div className="grid sm:grid-cols-2 items-start gap-10 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md font-[monospace]">
          <div >
            <h1 className="text-gray-800 text-3xl font-extrabold">Let's Talk</h1>
            <p className="text-sm text-gray-500 mt-4">
              Have some big idea or brand to develop and need help? Then reach out—we'd love to hear about your project and provide help.
            </p>

            <div className="mt-12">
              <h2 className="text-gray-800 text-base font-bold">Email</h2>
              <ul className="mt-4">
              <li className="flex items-center">
                  <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="black" viewBox="0 0 479.058 479.058">
                      <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
                    </svg>
                  </div>
                  <Link href="mailto:proff.pratiksingh@gmail.com" className="text-black text-sm ml-4">
                    <small className="block">Mail</small>
                    <strong>proff.pratiksingh@gmail.com</strong>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-gray-800 text-base font-bold">Socials</h2>
              <ul className="flex mt-4 space-x-4">
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <FaFacebook />
                </li>
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <FaInstagram />
                </li>
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <FaLinkedin />
                </li>
              </ul>
            </div>
          </div>

          <form onSubmit={onSubmit} className="ml-3 space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={handleChange}
                required
                className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-black"
              />
              <p className="text-red-500 text-xs" style={{ minHeight: '20px' }}>
                {errors.name}
              </p>
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                required
                className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-black"
              />
              <p className="text-red-500 text-xs" style={{ minHeight: '20px' }}>
                {errors.email}
              </p>
            </div>

            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formValues.subject}
                onChange={handleChange}
                required
                className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-black"
              />
              <p className="text-red-500 text-xs" style={{ minHeight: '20px' }}>
                {errors.subject}
              </p>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Message"
                value={formValues.message}
                onChange={handleChange}
                required
                className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-black"
              />
              <p className="text-red-500 text-xs" style={{ minHeight: '20px' }}>
                {errors.message}
              </p>
            </div>

            <button
              type="submit"
              className="bg-black w-full hover:bg-primary duration-200 text-white py-2 px-6 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
