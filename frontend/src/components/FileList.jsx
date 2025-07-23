import React, { useState } from 'react';
import axios from 'axios';

const FileList = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert('Please select a file!');
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFiles([...files, res.data]);
      alert('File uploaded successfully!');
    } catch (err) {
      alert('File upload failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload} className="mb-6 flex items-center gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 dark:text-gray-200"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded shadow font-semibold"
        >
          Upload
        </button>
      </form>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">File Name</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900">
          {files.map((file, idx) => (
            <tr key={idx} className="border-b border-gray-100 dark:border-gray-800">
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{file.originalname || file.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;