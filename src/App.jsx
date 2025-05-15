
import { useState, useEffect } from "react"
import Header from "./components/Header"
import AvatarGrid from "./components/AvatarGrid"
import CreateAvatarButton from "./components/CreateAvatarButton.jsx"
import CreateAvatarModal from "./components/CreateAvatarModal.jsx"

function App() {
  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [userName, setUserName] = useState("User")
  const [error, setError] = useState(null)
  const [editingAvatar, setEditingAvatar] = useState(null)

  useEffect(() => {
    // Fetch user data from Reqres API
    fetch("https://jsonplaceholder.typicode.com/users?page=1&per_page=3")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setAvatars(data.data)
          // Set a random user name for the greeting
          const randomUser = data.data[Math.floor(Math.random() * data.data.length)]
          if (randomUser) {
            setUserName(randomUser.first_name)
          }
        } else {
          // If API response format is unexpected, use fallback data
          setAvatars(fallbackAvatars)
          setUserName("Guest")
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        // Use fallback data on error
        setAvatars(fallbackAvatars)
        setUserName("Guest")
        setError("Could not load data from API. Using sample data instead.")
        setIsLoading(false)
      })
  }, [])

  const handleOpenModal = () => {
    setEditingAvatar(null)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingAvatar(null)
  }

  const handleEditAvatar = (avatar) => {
    setEditingAvatar(avatar)
    setShowModal(true)
  }

  const handleCreateAvatar = (newAvatar) => {
    if (editingAvatar) {
      // Update existing avatar
      setAvatars(
        avatars.map((avatar) => (avatar.id === editingAvatar.id ? { ...avatar, ...newAvatar, id: avatar.id } : avatar)),
      )
    } else {
      // Create new avatar
      const avatarWithId = {
        ...newAvatar,
        id: Date.now(), // Generate a unique ID
        email: `${newAvatar.first_name.toLowerCase()}.${newAvatar.last_name.toLowerCase()}@example.com`,
      }
      setAvatars([...avatars, avatarWithId])
    }
    setShowModal(false)
    setEditingAvatar(null)
  }

  // Fallback avatar data in case the API fails
  const fallbackAvatars = [
    {
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    },
    {
      id: 2,
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      last_name: "Weaver",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    },
    {
      id: 3,
      email: "emma.wong@reqres.in",
      first_name: "Emma",
      last_name: "Wong",
      avatar: "https://reqres.in/img/faces/3-image.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <Header userName={userName} />

        <main className="mt-8">
          {error && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg">{error}</div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <AvatarGrid avatars={avatars} onEditAvatar={handleEditAvatar} />
          )}
        </main>

        <CreateAvatarButton onClick={handleOpenModal} />

        {showModal && (
          <CreateAvatarModal
            onClose={handleCloseModal}
            onCreateAvatar={handleCreateAvatar}
            editingAvatar={editingAvatar}
          />
        )}
      </div>
    </div>
  )
}

export default App
