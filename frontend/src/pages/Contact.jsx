import { useState } from "react";

import api from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const response = await api.post("/contact", formData);

      console.log("Contact response:", response.data);

      setSuccess("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact error:", error);

      setError(error.response?.data?.message || "Failed to send your message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Have a question, suggestion, or feedback? Send us a message and we
            will get back to you.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="rounded-xl bg-gray-900 p-8 text-white">
            <h2 className="text-2xl font-bold">Get in Touch</h2>

            <p className="mt-4 leading-7 text-gray-300">
              We would love to hear from you. Feel free to contact us with any
              questions or feedback about NewsPortal.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm text-gray-400">Email</p>

                <p className="mt-1 font-medium">contact@newsportal.com</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Phone</p>

                <p className="mt-1 font-medium">+880 1234-567890</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Address</p>

                <p className="mt-1 font-medium">Jessore, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl bg-white p-8 shadow lg:col-span-2">
            {error && (
              <div className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="7"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
