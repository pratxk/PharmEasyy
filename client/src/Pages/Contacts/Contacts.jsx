import React from 'react';
import { useToast } from '@chakra-ui/react';
import Heading from '../../components/Skeleton/Heading';
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contacts() {
  const toast = useToast();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEB3_ACCESSKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success!",
          description: "Form Submitted Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        event.target.reset();
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

  return (
    <div className='overflow-hidden p-4'>
      <Heading
        text={"Contact Us"}
        textColor={"primary"}
        fromGradient={"secondary"}
        toGradient={"primary"}
      />
      <div className="mt-6">
        <div className="grid sm:grid-cols-2 items-start gap-14 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md font-[sans-serif]">
          <div>
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
                  <a href="mailto:info@example.com" className="text-black text-sm ml-4">
                    <small className="block">Mail</small>
                    <strong>info@example.com</strong>
                  </a>
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

          <form onSubmit={onSubmit} className="ml-auto space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-black"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-black"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="6"
              required
              className="w-full text-gray-800 rounded-md px-4 border text-sm pt-2.5 outline-black"
            ></textarea>
            <button
              type="submit"
              className="text-white bg-black hover:bg-gray-800 rounded-md text-sm px-4 py-3 w-full !mt-6"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
