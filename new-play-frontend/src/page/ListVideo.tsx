import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebare from "../components/Sidebare";
import { fetchVideos } from "../redux/apiCalls/videoApiCall";
import { RootState, AppDispatch } from "../redux/store";

const ListVideo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Typage explicite de `state`
  const { videos, isPending, isError, error } = useSelector(
    (state: RootState) => state.videos
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(videos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  // Filter videos based on the search query
  useEffect(() => {
    if (searchQuery) {
      setFilteredVideos(
        videos.filter((video: any) =>
          video.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredVideos(videos);
    }
  }, [searchQuery, videos]);

  if (isPending) {
    return (
      <div className="flex min-h-screen bg-gray-100 justify-center items-center">
        <p className="text-gray-500 text-lg">Loading videos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen bg-gray-100 justify-center items-center">
        <p className="text-red-500 text-lg">Error loading videos: {error}</p>
      </div>
    );
  }

  if (!filteredVideos || filteredVideos.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-500">
        <Sidebare />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">List of Videos</h1>
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos by name..."
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">#</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">File</th>
                <th className="py-2 px-4 border-b text-left">User ID</th>
                <th className="py-2 px-4 border-b text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              <td className="text-gray-500 text-lg">No videos found.</td>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-500">
      <Sidebare />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">List of Videos</h1>
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos by name..."
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">#</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">File</th>
              <th className="py-2 px-4 border-b text-left">User ID</th>
              <th className="py-2 px-4 border-b text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos.map((video: any, index: number) => (
              <tr key={video._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{video.name}</td>
                <td className="py-2 px-4 border-b">{video.file}</td>
                <td className="py-2 px-4 border-b">{video.userId}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(video.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListVideo;
