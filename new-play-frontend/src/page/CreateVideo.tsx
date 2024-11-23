import React, { useState } from 'react';
import Sidebare from '../components/Sidebare';
import { useCreateVideo } from '../hooks/useCreateVideo';

const CreateVideo = () => {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userId = userData._id; // ID de l'utilisateur actuel
  const mutation = useCreateVideo(); // Toujours appeler les hooks ici

  // Si l'utilisateur n'est pas authentifié, afficher un message d'erreur ou rediriger
  if (!userId) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebare />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p className="text-red-500">Erreur : Utilisateur non authentifié. Veuillez vous connecter.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !file) {
      setError('Tous les champs sont requis');
      return;
    }

    setError(''); // Réinitialiser l'erreur

    // Exécuter la mutation pour créer une vidéo
    mutation.mutate(
      { name, file: file as File, userId }, // On s'assure que file est bien du type File
      {
        onSuccess: () => {
          alert('Film ajouté avec succès');
          setName('');
          setFile(null);
        },
        onError: (err: any) => {
          setError(err?.response?.data?.message || 'Une erreur est survenue');
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-500">
      <Sidebare />
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Ajouter un Film</h2>
          
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ pour le nom du film */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom du film
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Entrez le nom du film"
              />
            </div>

            {/* Champ pour l'upload du film */}
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Fichier du film
              </label>
              <input
                type="file"
                id="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div> 
            {/* Bouton pour soumettre le formulaire */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                disabled={mutation.isPending} // Désactiver le bouton pendant le chargement
              >
                {mutation.isPending ? 'Ajout en cours...' : 'Ajouter le Film'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
