import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const FolderManager = () => {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [renameFolderId, setRenameFolderId] = useState('');
  const [renameFolderName, setRenameFolderName] = useState('');
  const [renameFileId, setRenameFileId] = useState('');
  const [renameFileName, setRenameFileName] = useState('');
  const [pathStack, setPathStack] = useState([]); // For breadcrumb navigation

  // Fetch folders and files for selected folder
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const url = selectedFolder
          ? `${API}/folders/${selectedFolder}`
          : `${API}/folders/`;
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setFolders(res.data.folders);
        setFiles(res.data.files);
      } catch (err) {
        alert('Failed to load folders/files');
      }
    };
    fetchContent();
  }, [selectedFolder]);

  // Create folder
  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!folderName) return;
    try {
      await axios.post(
        `${API}/folders/`,
        { name: folderName, parentId: selectedFolder },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setFolderName('');
      setSelectedFolder(selectedFolder); // refresh
    } catch (err) {
      alert('Failed to create folder');
    }
  };

  // Upload file
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const url = selectedFolder
        ? `${API}/files/upload/folder/${selectedFolder}`
        : `${API}/files/upload`;
      await axios.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSelectedFile(null);
      setSelectedFolder(selectedFolder); // refresh
    } catch (err) {
      alert('File upload failed');
    }
  };

  // Navigate into folder
  const openFolder = (folder) => {
    setPathStack([...pathStack, { id: folder._id, name: folder.name }]);
    setSelectedFolder(folder._id);
  };

  // Go up one folder
  const goUp = () => {
    const newStack = [...pathStack];
    newStack.pop();
    setPathStack(newStack);
    setSelectedFolder(newStack.length ? newStack[newStack.length - 1].id : null);
  };

  // Breadcrumb navigation
  const renderBreadcrumb = () => (
    <div className="mb-4 flex items-center gap-2 text-sm">
      <button onClick={() => { setSelectedFolder(null); setPathStack([]); }} className="text-blue-700">Root</button>
      {pathStack.map((folder, idx) => (
        <span key={folder.id}>
          {' / '}
          <button
            onClick={() => {
              setSelectedFolder(folder.id);
              setPathStack(pathStack.slice(0, idx + 1));
            }}
            className="text-blue-700"
          >
            {folder.name}
          </button>
        </span>
      ))}
    </div>
  );

  // Rename folder
  const handleRenameFolder = async (e) => {
    e.preventDefault();
    if (!renameFolderName) return;
    try {
      await axios.put(
        `${API}/folders/${renameFolderId}`,
        { name: renameFolderName },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setRenameFolderId('');
      setRenameFolderName('');
      setSelectedFolder(selectedFolder); // refresh
    } catch (err) {
      alert('Rename failed');
    }
  };

  // Delete folder
  const handleDeleteFolder = async (id) => {
    if (!window.confirm('Delete this folder and all its contents?')) return;
    try {
      await axios.delete(
        `${API}/folders/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSelectedFolder(selectedFolder); // refresh
    } catch (err) {
      alert('Delete failed');
    }
  };

  // Rename file
  const handleRenameFile = async (e) => {
    e.preventDefault();
    if (!renameFileName) return;
    try {
      await axios.put(
        `${API}/files/rename/${renameFileId}`,
        { name: renameFileName },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setRenameFileId('');
      setRenameFileName('');
      setSelectedFolder(selectedFolder); // refresh
    } catch (err) {
      alert('Rename failed');
    }
  };

  // Delete file
  const handleDeleteFile = async (id) => {
    if (!window.confirm('Delete this file?')) return;
    try {
      await axios.delete(
        `${API}/files/delete/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSelectedFolder(selectedFolder); // refresh
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-300">File Explorer</h2>
      {renderBreadcrumb()}
      {pathStack.length > 0 && (
        <button onClick={goUp} className="mb-4 px-3 py-1 bg-gray-200 rounded text-sm">Up</button>
      )}

      {/* Create Folder */}
      <form onSubmit={handleCreateFolder} className="flex gap-2 mb-4">
        <input
          type="text"
          value={folderName}
          onChange={e => setFolderName(e.target.value)}
          placeholder="New folder name"
          className="px-3 py-2 border rounded w-64"
        />
        <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded">Create Folder</button>
      </form>

      {/* Folder List */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Folders</h3>
        <ul>
          {folders.map(folder => (
            <li key={folder._id} className="flex items-center gap-2 mb-1">
              <button
                className="text-blue-700 underline"
                onClick={() => openFolder(folder)}
              >
                <span role="img" aria-label="folder">📁</span> {folder.name}
              </button>
              <button
                className="text-xs text-yellow-600"
                onClick={() => { setRenameFolderId(folder._id); setRenameFolderName(folder.name); }}
              >
                Rename
              </button>
              <button
                className="text-xs text-red-600"
                onClick={() => handleDeleteFolder(folder._id)}
              >
                Delete
              </button>
            </li>
          ))}
          {folders.length === 0 && <li className="text-gray-500">No folders</li>}
        </ul>
      </div>
      {renameFolderId && (
        <form onSubmit={handleRenameFolder} className="mb-4 flex gap-2">
          <input
            type="text"
            value={renameFolderName}
            onChange={e => setRenameFolderName(e.target.value)}
            className="px-3 py-2 border rounded w-64"
          />
          <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded">Save</button>
          <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setRenameFolderId('')}>Cancel</button>
        </form>
      )}

      {/* File Upload */}
      <form onSubmit={handleFileUpload} className="flex gap-2 mb-4">
        <input
          type="file"
          onChange={e => setSelectedFile(e.target.files[0])}
          className="block"
        />
        <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded">Upload File</button>
      </form>

      {/* File List */}
      <div>
        <h3 className="font-semibold mb-2">Files</h3>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">File Name</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900">
            {files.map(file => (
              <tr key={file._id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                  <span role="img" aria-label="file">📄</span> {file.originalname}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="text-xs text-yellow-600"
                    onClick={() => { setRenameFileId(file._id); setRenameFileName(file.originalname); }}
                  >
                    Rename
                  </button>
                  <button
                    className="text-xs text-red-600"
                    onClick={() => handleDeleteFile(file._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renameFileId && (
        <form onSubmit={handleRenameFile} className="mt-4 flex gap-2">
          <input
            type="text"
            value={renameFileName}
            onChange={e => setRenameFileName(e.target.value)}
            className="px-3 py-2 border rounded w-64"
          />
          <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded">Save</button>
          <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setRenameFileId('')}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default FolderManager;