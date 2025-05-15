
import { useState, useEffect } from "react"

function Header({ userName = "User" }) {
    const [greeting, setGreeting] = useState("")

    useEffect(() => {
        const hour = new Date().getHours()
        let newGreeting = ""

        if (hour < 12) {
            newGreeting = "Good morning"
        } else if (hour < 18) {
            newGreeting = "Good afternoon"
        } else {
            newGreeting = "Good evening"
        }

        setGreeting(newGreeting)
    }, [])

    return (
        <header className="pt-6 pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">AI Avatar Dashboard</h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                        {greeting}, {userName}! Welcome back to your avatar collection.
                    </p>
                </div>

                <div className="mt-4 md:mt-0">
                    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 py-2 px-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-black font-semibold">
                            {userName ? userName.charAt(0) : "U"}
                        </div>
                        <span className="font-medium text-black">{userName}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
