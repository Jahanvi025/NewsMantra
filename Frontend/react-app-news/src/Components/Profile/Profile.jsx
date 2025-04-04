import React, { useEffect, useState } from "react"

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user")
      const parsedUser = JSON.parse(rawUser)
      console.log("Parsed user:", parsedUser)

      if (parsedUser) {
        setUser(parsedUser)
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error)
    }
  }, [])

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <p className="text-lg text-black font-[Supreme]">No user data found. Please login.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username || "User"}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full border border-gray-300 shadow"
        />
        <h2 className="text-2xl font-semibold text-black font-[Supreme]">
          {user.username}
        </h2>
        <p className="text-gray-600 text-sm font-[Supreme]">
          {user.email}
        </p>
      </div>
    </div>
  )
}

export default Profile
