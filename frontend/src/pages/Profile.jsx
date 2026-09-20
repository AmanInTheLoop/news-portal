import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import api from "../services/api";
import { login } from "../store/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/users/profile");

        const user = response.data.data.user;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          profileImage: user.profileImage || "",
        });
      } catch (error) {
        console.error("Profile error:", error);

        setError(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
      setSaving(true);

      const response = await api.put("/users/profile", formData);

      const updatedUser = response.data.data.user;

      // Update Redux + localStorage
      const token = localStorage.getItem("token");

      dispatch(
        login({
          token,
          user: updatedUser,
        }),
      );

      setFormData({
        name: updatedUser.name,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage || "",
      });

      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Update profile error:", error);

      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>

        <p className="mt-6 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>

        <p className="mt-2 text-gray-600">
          View and update your account information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="mt-8 max-w-2xl rounded-xl bg-white p-6 shadow">
        {/* Profile Image Preview */}
        <div className="mb-8 flex items-center gap-5">
          {formData.profileImage ? (
            <img
              src={formData.profileImage}
              alt={formData.name}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              {formData.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>

            <p className="text-gray-500">{formData.email}</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">Name</label>

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

          {/* Profile Image */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Profile Image URL
            </label>

            <input
              type="url"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              placeholder="https://example.com/profile.jpg"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <p className="mt-2 text-sm text-gray-500">
              Enter a public image URL.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400">
            {saving ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
