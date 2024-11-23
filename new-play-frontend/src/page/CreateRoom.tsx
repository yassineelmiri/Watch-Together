import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebare from "../components/Sidebare";
import useCreateRoom from "../hooks/useCreateRoom";
import { fetchVideos } from "../redux/apiCalls/videoApiCall";
import { fetchUsers } from "../redux/apiCalls/userApiCall";
import { RootState, AppDispatch } from "../redux/store";

// Interfaces pour les types des données
interface Video {
  id: string;
  name: string;
  file: string;
}

interface User {
  _id: string; // Correspond à l'objet utilisateur dans vos données
  username: string;
}

const CreateRoom: React.FC = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [numberOfPlaces, setNumberOfPlaces] = useState<number>(1);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [roomTime, setRoomTime] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  // Sélecteurs avec typage
  const { videos } = useSelector((state: RootState) => state.videos);
  const { users } = useSelector((state: RootState) => state.users);

  // Récupération des vidéos et utilisateurs au chargement
  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(fetchUsers());
  }, [dispatch]);

  const { mutate, isPending, error, isSuccess } = useCreateRoom();

  // Soumission du formulaire
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRoom = {
      title: roomName,
      numberOfPlaces,
      Videos: selectedVideos,
      Users: selectedUsers,
    };

    mutate(newRoom);

    // Réinitialisation du formulaire
    setRoomName("");
    setNumberOfPlaces(0);
    setSelectedVideos([]);
    setSelectedUsers([]);
    setRoomTime("");
  };

  // Gestion de la sélection des vidéos
  const handleSelectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setState(selectedOptions);
  };
  // Gestion de la sélection des utilisateurs
  const handleUserSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedUsers(selectedOptions);
  };

  return (
    <div className="flex min-h-screen bg-gray-500">
      {/* Sidebar */}
      <Sidebare />

      <div className="flex-1 p-8 ">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Create a Room
        </h2>

        {/* Formulaire de création */}
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          {/* Room Name et Number of Places sur la même ligne */}
          <div className="flex gap-4 mb-6">
            {/* Room Name */}
            <div className="flex-1">
              <label
                htmlFor="roomName"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                placeholder="Enter room name"
                required
              />
            </div>

            {/* Number of Places */}
            <div className="flex-1">
              <label
                htmlFor="numberOfPlaces"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Number of Places
              </label>
              <input
                type="number"
                id="numberOfPlaces"
                value={numberOfPlaces}
                onChange={(e) => setNumberOfPlaces(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                placeholder="Enter number"
                required
                min={1}
              />
            </div>
          </div>
          <div className="flex gap-4 mb-6">
            {/* Sélection des vidéos */}
            <div className="flex-1">
              <label
                htmlFor="videos"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Select Videos
              </label>
              <select
                id="videos"
                multiple
                value={selectedVideos}
                onChange={(e) => handleSelectionChange(e, setSelectedVideos)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              >
                {videos.map((video: Video) => (
                  <option key={video.id} value={video.id}>
                    {video.file}
                  </option>
                ))}
              </select>
            </div>

            {/* Sélection des utilisateurs */}
            <div className="flex-1">
              <label
                htmlFor="users"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Select Users
              </label>
              <select
                id="users"
                multiple
                value={selectedUsers}
                onChange={handleUserSelection}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600"
              >
                {users.map((user: User) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Date et heure */}
          <div className="mb-6">
            <label
              htmlFor="roomTime"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Select Room Time
            </label>
            <input
              type="datetime-local"
              id="roomTime"
              value={roomTime}
              onChange={(e) => setRoomTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Room"}
          </button>
        </form>

        {/* Messages de succès ou d'erreur */}
        {isSuccess && (
          <p className="mt-4 text-green-600 font-medium">
            Room created successfully!
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-600 font-medium">
            Error creating room: {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateRoom;
