import React, { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Phone number validation (10 digits only)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setStatus("Phone number must be exactly 10 digits.");
      return;
    }

    // Email validation (@gmail.com only)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("Email must be a valid @gmail.com address.");
      return;
    }

    const res = await fetch("https://formsubmit.co/ajax/dewnexa@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("Message sent successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      setStatus("Failed to send message. Try again later.");
    }
  };

  return (
    <section
      id="contact"
      className="relative px-4 bg-black text-white overflow-hidden pb-10"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#5b1d00] opacity-80 pointer-events-none z-0" />

      {/* Content Container */}
      <div className="relative z-10">
        <h2 className="text-5xl font-bold text-center mb-10">Contact Us</h2>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Left Info */}
          <div className="md:w-1/3 bg-gray-900 shadow-lg p-14 rounded-lg text-center">
            <img
              src={logo}
              alt="logo"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-2 border-white"
            />
            <h2 className="text-3xl font-bold">Nexadew</h2>
            <p className="text-gray-300 mt-2 text-lg py-3">
              For hiring and collaborations, connect with us via email.
            </p>
            <div className="mt-4 text-gray-300">
              <p className="text-lg py-2">📞 +91 9900502164</p>
              <p className="text-lg py-2">📧 hello@nexadew.com</p>
            </div>
            <div className="flex justify-center gap-4 mt-6 text-2xl text-white">
              <a
                href="https://www.linkedin.com/company/nexa-dew/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="hover:text-blue-500" />
              </a>
              <a
                href="https://GitHub.com/nexadew2"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub className="hover:text-gray-400" />
              </a>
              <a
                href="https://x.com/NexaDew?t=XGh26llNtMU6jsP2E0nd5w&s=09"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter className="hover:text-blue-400" />
              </a>
              <a
                href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=y00lgfg"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="hover:text-red-600" />
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="md:w-2/3">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-900 p-6 lg:p-10 rounded-lg shadow"
            >
              <InputComponent
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                dark
              />
              <InputComponent
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                dark
              />
              <InputComponent
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                dark
              />
              <InputComponent
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                dark
              />
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-white"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black text-white border border-gray-500 rounded px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Send Message
              </button>
              {status && (
                <p
                  className={`text-sm ${
                    status.includes("successfully")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
