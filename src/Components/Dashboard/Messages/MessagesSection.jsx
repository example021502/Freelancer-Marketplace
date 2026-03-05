import React, { useContext, useState } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import { motion } from "framer-motion";

function MessagesSection() {
  const { dashboardState } = useContext(DashboardContext);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send to an API
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Messages List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
        </div>
        <div className="h-96 overflow-y-auto">
          {dashboardState.messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 border-b border-gray-100 ${
                message.read
                  ? "bg-gray-50"
                  : "bg-green-50 border-l-4 border-green-500"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-800">{message.from}</h3>
                  <p className="text-sm text-gray-600">{message.time}</p>
                </div>
                {!message.read && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>
              <p className="text-gray-700">{message.message}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <form onSubmit={handleSendMessage} className="flex gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default MessagesSection;
