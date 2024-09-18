import React, { useState, useEffect } from "react";

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ id: "", title: "", description: "" });
  const [editIssue, setEditIssue] = useState({ id: "", title: "", description: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

  // Fetch all issues
  const fetchIssues = async () => {
    try {
      const response = await fetch("http://localhost:3001/issues");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      setErrorMessage(`Failed to fetch issues: ${error.message}`);
    }
  };

  // Create new issue
  const createIssue = async () => {
    try {
      const response = await fetch("http://localhost:3001/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIssue),
      });

      if (response.status === 409) {
        throw new Error("Issue ID already exists (409 Conflict).");
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setIssues([...issues, data]);
      setErrorMessage(""); // Clear error message after success
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Update issue
  const updateIssue = async () => {
    try {
      const response = await fetch(`http://localhost:3001/issues/${editIssue.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editIssue),
      });

      if (response.status === 404) {
        throw new Error("Issue not found (404).");
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setIssues(issues.map((issue) => (issue.id === data.id ? data : issue)));
      setErrorMessage(""); // Clear error message after success
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Delete issue
  const deleteIssue = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/issues/${id}`, {
        method: "DELETE",
      });

      if (response.status === 404) {
        throw new Error("Issue not found (404).");
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setIssues(issues.filter((issue) => issue.id !== id));
      setErrorMessage(""); // Clear error message after success
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="App bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">Issue Tracker</h1>

        {/* Display Error Messages */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <h2 className="text-xl font-semibold mb-4">Create Issue</h2>
        <div className="mb-6">
          <input
            className="border p-2 rounded w-full mb-2"
            placeholder="ID"
            value={newIssue.id}
            onChange={(e) => setNewIssue({ ...newIssue, id: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full mb-2"
            placeholder="Title"
            value={newIssue.title}
            onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full mb-2"
            placeholder="Description"
            value={newIssue.description}
            onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
          />
          <button
            onClick={createIssue}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Edit Issue</h2>
        <div className="mb-6">
          <input
            className="border p-2 rounded w-full mb-2"
            placeholder="ID"
            value={editIssue.id}
            onChange={(e) => setEditIssue({ ...editIssue, id: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full mb-2"
            placeholder="Title"
            value={editIssue.title}
            onChange={(e) => setEditIssue({ ...editIssue, title: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full mb-2"
            placeholder="Description"
            value={editIssue.description}
            onChange={(e) => setEditIssue({ ...editIssue, description: e.target.value })}
          />
          <button
            onClick={updateIssue}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Update
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Issue List</h2>
        <table className="table-auto w-full border-collapse border border-gray-200 mb-6">
          <thead>
            <tr>
              <th className="border p-4 text-left">ID</th>
              <th className="border p-4 text-left">Title</th>
              <th className="border p-4 text-left">Description</th>
              <th className="border p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, index) => (
              <tr key={index}>
                <td className="border p-4">{issue.id}</td>
                <td className="border p-4">{issue.title}</td>
                <td className="border p-4">{issue.description}</td>
                <td className="border p-4">
                  <button
                    onClick={() => deleteIssue(issue.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
