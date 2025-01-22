import React from 'react';

const EditProject = ({ isOpen, onClose, onEditProject, editingProject, setEditingProject }) => {
  if (!isOpen) return null; // Don't render if the popup is not open

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={editingProject?.name || ''}
            onChange={(e) =>
              setEditingProject({ ...editingProject, name: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={editingProject?.desc || ''}
            onChange={(e) =>
              setEditingProject({ ...editingProject, desc: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={editingProject?.status || 'Pending'}
            onChange={(e) =>
              setEditingProject({ ...editingProject, status: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Active">Active</option>
            <option value="InActive">InActive</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onEditProject(editingProject)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
