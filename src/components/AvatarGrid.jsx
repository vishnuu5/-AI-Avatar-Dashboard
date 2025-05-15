import AvatarCard from "./AvatarCard.jsx"

function AvatarGrid({ avatars, onEditAvatar }) {
  // Ensure avatars is always an array
  const avatarList = Array.isArray(avatars) ? avatars : []

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Avatars</h2>

      {avatarList.length === 0 ? (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p className="text-gray-600 dark:text-gray-300">No avatars found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {avatarList.map((avatar) => (
            <AvatarCard key={avatar.id} avatar={avatar} onEdit={() => onEditAvatar(avatar)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AvatarGrid
