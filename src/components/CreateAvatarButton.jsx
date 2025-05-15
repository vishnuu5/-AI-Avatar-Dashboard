import { FaPlus } from "react-icons/fa";

function CreateAvatarButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-purple-500 hover:bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Create new avatar"
        >
            < FaPlus className="h-6 w-6" />
        </button>
    );
}

export default CreateAvatarButton;
