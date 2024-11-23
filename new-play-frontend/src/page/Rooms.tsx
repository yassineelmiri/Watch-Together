import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebare from "../components/Sidebare";
import { RootState, AppDispatch } from "../redux/store";
import { fetchrooms } from "../redux/apiCalls/roomApiCall";
import { io, Socket } from "socket.io-client";

interface Room {
  _id: string;
  title: string;
  numberOfPlaces: number;
  Users: string[];
  createdAt: string;
  Videos: string[];
}

const Rooms: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // WebSocket state
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  // Local state
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Redux state
  const { rooms, isPending, isError, error } = useSelector(
    (state: RootState) => state.rooms
  );

  // User data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const userId = userData._id;

  // Fetch rooms on mount
  useEffect(() => {
    dispatch(fetchrooms());
  }, [dispatch]);

  // Initialize WebSocket connection
  useEffect(() => {
    const newSocket = io("http://localhost:4000/chat");
    console.log(newSocket);
    
    setSocket(newSocket);

    newSocket.on("ReceiveMessage", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Send message via WebSocket
  const sendMessage = (newMessage: string) => {
    if (newMessage.trim() && socket) {
      socket.emit("SendMessage", {
        userId,
        message: newMessage,
      });
    }
  };

  // Filter rooms for the current user
  const filteredRooms: Room[] = rooms.filter((room: Room) =>
    room.Users?.includes(userId)
  );

  // Navigation handlers
  const nextRoom = () => {
    if (currentRoomIndex < filteredRooms.length - 1) {
      setCurrentRoomIndex(currentRoomIndex + 1);
    }
  };

  const prevRoom = () => {
    if (currentRoomIndex > 0) {
      setCurrentRoomIndex(currentRoomIndex - 1);
    }
  };

  const currentRoom = filteredRooms[currentRoomIndex];

  return (
    <div className="flex min-h-screen bg-gray-500">
      {/* Sidebar gauche */}
      <Sidebare />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">
          List of Sessions ({filteredRooms.length})
        </h1>

        {isPending && <p>Loading rooms...</p>}
        {isError && <p className="text-red-500">Error: {error}</p>}

        {filteredRooms.length > 0 && currentRoom ? (
          <div className="flex flex-col items-center justify-center">
            {/* Room Details */}
            <div className="max-w-[900px] w-full bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-2">{currentRoom.title}</h2>
              {currentRoom.Videos?.[0] ? (
                <video
                  controls
                  src={`http://localhost:4000/uploads/${currentRoom.Videos[0]}`}
                  className="w-full h-auto rounded-lg shadow-md bg-gray-100"
                />
              ) : (
                <p className="text-gray-500">No video available</p>
              )}
              <p>
                <strong>Number of Places:</strong> {currentRoom.numberOfPlaces}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(currentRoom.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-md">
              <button
                onClick={prevRoom}
                className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 disabled:bg-purple-300"
                disabled={currentRoomIndex === 0}
              >
                Prev
              </button>
              <button
                onClick={nextRoom}
                className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 disabled:bg-purple-300"
                disabled={currentRoomIndex === filteredRooms.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>No rooms available</p>
        )}
      </div>

      {/* Sidebar droite */}
      {currentRoom && (
        <aside
          className={`fixed top-0 right-0 h-screen bg-white shadow-lg p-4 transition-transform transform ${
            isSidebarVisible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsSidebarVisible(false)}
            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
          >
            X
          </button>
          <h2 className="text-lg font-bold mb-4">
            Users ({currentRoom.Users?.length || 0})
          </h2>
          <ul className="space-y-2">
            {currentRoom.Users?.map((user, index) => (
              <li key={index} className="flex items-center space-x-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${user}&background=random`}
                  alt={user}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-700">{user}</span>
              </li>
            ))}
          </ul>

          {/* Chat Section */}
          <div className="mt-6">
            <h3 className="text-md font-bold mb-4">Chat</h3>
            <div className="h-48 overflow-y-auto border rounded-md p-2 bg-gray-100">
              <ul className="space-y-2">
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className={`text-sm p-2 rounded-lg ${
                      index % 2 === 0
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {msg}
                  </li>
                ))}
              </ul>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const messageInput = e.currentTarget.elements
                  .namedItem("message") as HTMLInputElement;
                sendMessage(messageInput.value);
                messageInput.value = "";
              }}
              className="mt-4 flex"
            >
              <input
                type="text"
                name="message"
                placeholder="Write a message..."
                className="flex-1 border border-gray-300 rounded-md p-2"
              />
              <button
                type="submit"
                className="ml-2 bg-purple-500 text-white p-2 rounded-md"
              >
                Send
              </button>
            </form>
          </div>
        </aside>
      )}

      {!isSidebarVisible && (
        <button
          onClick={() => setIsSidebarVisible(true)}
          className="fixed bottom-4 right-4 bg-purple-500 text-white p-4 rounded-full shadow-lg"
        >
          Show Users
        </button>
      )}
    </div>
  );
};

export default Rooms;
