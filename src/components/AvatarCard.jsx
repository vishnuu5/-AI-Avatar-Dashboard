
function AvatarCard({ avatar, onEdit }) {
    // Ensure avatar object has all required properties
    const safeAvatar = {
        first_name: avatar?.first_name || "Unknown",
        last_name: avatar?.last_name || "User",
        email: avatar?.email || "no-email@example.com",
        avatar: avatar?.avatar || "https://via.placeholder.com/150",
    }

    return (
        <div className="card group">
            <div className="relative">
                <img
                    src={safeAvatar.avatar || "/placeholder.svg"}
                    alt={`${safeAvatar.first_name} ${safeAvatar.last_name}`}
                    className="w-full h-48 object-cover object-center"
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://via.placeholder.com/150?text=No+Image"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                        <button className="btn btn-primary w-full" onClick={onEdit}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                    {safeAvatar.first_name} {safeAvatar.last_name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{safeAvatar.email}</p>

                <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
                    </div>

                    <button className="btn btn-secondary text-sm" onClick={onEdit}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AvatarCard
