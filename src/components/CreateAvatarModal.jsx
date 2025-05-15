
import { useRef, useEffect, useState } from "react"
import { GoX } from "react-icons/go"
import { RiGalleryLine } from "react-icons/ri"

function CreateAvatarModal({ onClose, onCreateAvatar, editingAvatar }) {
    const modalRef = useRef(null)
    const fileInputRef = useRef(null)
    const dropAreaRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isDragging, setIsDragging] = useState(false)

    // Initialize form with editing avatar data if available
    useEffect(() => {
        if (editingAvatar) {
            setFirstName(editingAvatar.first_name || "")
            setLastName(editingAvatar.last_name || "")
            setPreviewUrl(editingAvatar.avatar || "")
        }
    }, [editingAvatar])

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose()
            }
        }

        function handleEscapeKey(event) {
            if (event.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEscapeKey)

        // Prevent scrolling when modal is open
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscapeKey)
            document.body.style.overflow = "auto"
        }
    }, [onClose])

    useEffect(() => {
        const dropArea = dropAreaRef.current

        if (!dropArea) return

        const handleDragOver = (e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(true)
        }

        const handleDragEnter = (e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(true)
        }

        const handleDragLeave = (e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(false)
        }

        const handleDrop = (e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(false)

            const files = e.dataTransfer.files
            if (files && files.length > 0) {
                handleFiles(files[0])
            }
        }

        dropArea.addEventListener("dragover", handleDragOver)
        dropArea.addEventListener("dragenter", handleDragEnter)
        dropArea.addEventListener("dragleave", handleDragLeave)
        dropArea.addEventListener("drop", handleDrop)

        return () => {
            dropArea.removeEventListener("dragover", handleDragOver)
            dropArea.removeEventListener("dragenter", handleDragEnter)
            dropArea.removeEventListener("dragleave", handleDragLeave)
            dropArea.removeEventListener("drop", handleDrop)
        }
    }, [])

    const handleFiles = (file) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            handleFiles(file)
        }
    }

    const handleBrowseClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Create new avatar object
        const newAvatar = {
            first_name: firstName,
            last_name: lastName,
            avatar: previewUrl,
        }

        // Pass to parent component
        onCreateAvatar(newAvatar)
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div
                ref={modalRef}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-[fadeIn_0.3s_ease-out]"
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            {editingAvatar ? "Edit Avatar" : "Create New Avatar"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <GoX className="h-6 w-6" />
                        </button>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="First name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Last name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar Image</label>
                            <div
                                ref={dropAreaRef}
                                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${isDragging ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "border-gray-300 dark:border-gray-600 border-dashed"} rounded-lg transition-colors duration-200`}
                            >
                                {previewUrl ? (
                                    <div className="space-y-2 text-center">
                                        <img
                                            src={previewUrl || "/placeholder.svg"}
                                            alt="Preview"
                                            className="mx-auto h-32 w-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreviewUrl("")
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = ""
                                                }
                                            }}
                                            className="text-sm text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-1 text-center">
                                        <RiGalleryLine className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                            <button
                                                type="button"
                                                onClick={handleBrowseClick}
                                                className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-purple-500 hover:text-purple-600 focus-within:outline-none px-2 py-1"
                                            >
                                                <span>Upload a file</span>
                                            </button>
                                            <p className="pl-1 pt-1">or drag and drop</p>
                                            <input
                                                ref={fileInputRef}
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={onClose} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`btn btn-primary ${!firstName || !lastName || !previewUrl ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={!firstName || !lastName || !previewUrl}
                            >
                                {editingAvatar ? "Update Avatar" : "Create Avatar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAvatarModal
