import React, { useEffect, useState } from 'react';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

import AddProject from './AddProject';
import EditProject from './EditProject';


const ProjectList = () => {
  const api_endpoint = "https://iamismaill.com/api/api/"
  const [projects, setProjects] = useState([]);
  const [showImport, setShowImport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    desc: '',
    status: 'Active',
  });
  const [editingProject, setEditingProject] = useState(null);


  // Fetch projects from server API
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(api_endpoint+'projects');
      const data = await response.json();
      console.log("data",data)
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle Add Project
  const handleAddProject = async () => {
    try {
      const response = await fetch(api_endpoint+'projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Project added successfully:', data);
        fetchProjects(); // Refresh the project list
        setIsPopupOpen(false); // Close popup
        Swal.fire('Success!', 'Project added successfully.', 'success');
        setNewProject({ name: '', description: '', status: '' }); // Clear inputs
      } else {
        Swal.fire('Error!', 'Failed to add the project.', 'error');
        console.error('Error adding project:', response.statusText);
      }
    } catch (error) {
      Swal.fire('Error!', 'An unexpected error occurred.', 'error');
      console.error('Error adding project:', error);
    }
  };

  // Handle Edit Project
  const handleEditProject = async (updatedProject) => {
    try {
      const response = await fetch(api_endpoint+`projects/${updatedProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });

      if (response.ok) {
        fetchProjects(); // Refresh the project list
        setIsEditPopupOpen(false); // Close edit popup
        Swal.fire('Success!', 'Project updated successfully.', 'success');
        setEditingProject(null);
      } else {
        Swal.fire('Error!', 'Failed to update the project.', 'error');
        console.error('Error updating project:', response.statusText);
      }
    } catch (error) {
      Swal.fire('Error!', 'An unexpected error occurred.', 'error');
      console.error('Error updating project:', error);
    }
  };  
  
  // Handle Delete Project
  const handleDeleteProject = async (projectId) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this project? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
    if (confirmation.isConfirmed) {
      try {
        const response = await fetch(api_endpoint+`projects/${projectId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          Swal.fire('Deleted!', 'The project has been deleted.', 'success');
          fetchProjects(); // Refresh the project list
        } else {
          Swal.fire('Error!', 'Failed to delete the project.', 'error');
          console.error('Error deleting project:', response.statusText);
        }
      } catch (error) {
        Swal.fire('Error!', 'An unexpected error occurred.', 'error');
        console.error('Error deleting project:', error);
      }
    }
  };
  const formatDate = (date) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short', // "Jan"
      day: 'numeric', // "21"
      year: 'numeric', // "2025"
      hour: 'numeric', // "5"
      minute: 'numeric', // "03"
      hour12: true, // Use 12-hour format
      timeZone: 'UTC', // Ensure UTC time
    }).format(new Date(date));
    return formattedDate;
  }


  // Import projects from Excel file
  const handleImport = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const importedProjects = XLSX.utils.sheet_to_json(sheet);

        // Validate and add the imported projects
        if (importedProjects.length) {
          // Map and transform the headers
          const transformedProjects = importedProjects.map((project) => ({
            name: project.Name || '',
            desc: project.Description || '',
            status: project.Status || '',
            // created_at: project.CreatedAt || '',
            // updated_at: project.UpdatedAt || '',
          }));
          const savePromises = transformedProjects.map(async (project) => {
            try {
              const response = await fetch(api_endpoint+'projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
              });
  
              if (!response.ok) {
                throw new Error('Failed to save project');
              }
            } catch (error) {
              console.error('Error saving project:', error);
            }
          });
  
          // Wait for all save requests to complete
          await Promise.all(savePromises);
          fetchProjects();
          Swal.fire('Success!', 'Projects imported and saved successfully.', 'success');
          console.log("Importing:", transformedProjects)
        } else {
          Swal.fire('Error!', 'No valid data found in the file.', 'error');
        }
      };

      reader.onerror = () => {
        Swal.fire('Error!', 'Failed to read the file.', 'error');
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="w-full bg-white rounded-lg shadow-md p-6 flex items-center justify-between mb-4">
        <div className="flex space-x-4">
        <button onClick={()=>setShowImport(!showImport)} className="px-4 py-2 border border-gray-600 text-gray-700 rounded-lg flex items-center space-x-2 hover:border-blue-600 hover:text-blue-500 transition">
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span>Import</span>
            
          </button>
          {showImport && <div className="px-4 py-2 border border-gray-600 text-gray-700 rounded-lg flex items-center space-x-2 hover:border-blue-600 hover:text-blue-500 transition">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImport}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
        </div>
        }
          <button className="px-4 py-2 border border-gray-600 text-gray-700 rounded-lg flex items-center space-x-2 hover:border-green-600 hover:text-green-600 transition">
            <ArrowUpTrayIcon className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
        <button onClick={() => setIsPopupOpen(true)} className="px-4 py-2 bg-[#009edb] text-white rounded flex items-center space-x-2 hover:bg-[#1f97c4] transition">
          <PlusIcon className="h-5 w-5" />
          <span>Add Project</span>
        </button>
      </div>


      {isLoading ? (
        <div className="text-center text-lg font-semibold text-blue-500">Loading projects...</div>
      ):
      (projects.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-[#009edb] text-white border-b border-gray-100 rounded-t-lg">
                <th className="text-left py-3 px-4 border-r border-gray-100">Name</th>
                <th className="text-left py-3 px-4 border-r border-gray-100">Description</th>
                <th className="py-3 px-4 border-r border-gray-100">Status</th>
                <th className="text-left py-3 px-4 border-r border-gray-100">Create At</th>
                <th className="text-left py-3 px-4 border-r border-gray-100">Update At</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={project.id || index} // Ensure a unique key, use `id` if available
                  className={`border-b ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="text-left py-3 px-4 border-r border-gray-300">{project.name}</td>
                  <td className="text-left py-3 px-4 border-r border-gray-300">{project.desc}</td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        project.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'Active'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="text-left py-3 px-4 border-r border-gray-300">{formatDate(project?.created_at)}</td>
                  <td className="text-left py-3 px-4 border-r border-gray-300">{formatDate(project?.updated_at)}</td>
                  <td className="py-3 px-4 flex space-x-2 w-4">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setIsEditPopupOpen(true);
                    }}
                    className="px-3 py-1  text-gray-500 rounded hover:text-yellow-600 transition"
                  >
                    <PencilSquareIcon className="h-5 w-5 " />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-3 py-1 text-gray-500 rounded hover:text-red-600 transition"
                  >
                    <TrashIcon className="h-5 w-5 " />
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No projects found.</p>
      ))}

      {/* Add Project Popup */}
      <AddProject
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAddProject={handleAddProject}
        newProject={newProject}
        setNewProject={setNewProject}
      />

      {/* Edit Project Popup */}
      <EditProject
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        onEditProject={handleEditProject}
        editingProject={editingProject}
        setEditingProject={setEditingProject}
      />
    </div>
  );
};

export default ProjectList;
