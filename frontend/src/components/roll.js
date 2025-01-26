import React, { useEffect, useState } from "react";
import axios from "axios";

function Roll() {
  const [rollList, setRollList] = useState([]);
  const [newRoll, setNewRoll] = useState({ name: "", isActive: true });
  const [editRoll, setEditRoll] = useState(null);

  useEffect(() => {
    fetchRollList();
  }, []);

  const fetchRollList = () => {
    axios.get("http://localhost:3001/roll/list")
      .then(response => {
        setRollList(response.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleAddRoll = () => {
    axios.post("http://localhost:3001/roll/add", newRoll)
      .then(() => {
        fetchRollList();
        setNewRoll({ name: "", isActive: true });
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleEditRoll = () => {
    if (editRoll) {
      axios.put("http://localhost:3001/roll/update", editRoll)
        .then(() => {
          fetchRollList();
          setEditRoll(null);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleDeleteRoll = (id) => {
    axios.delete("http://localhost:3001/roll/remove", { data: { id } })
      .then(() => {
        fetchRollList();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <h2>Roll List</h2>

      {/* Add New Roll Section */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Name"
          value={newRoll.name}
          onChange={(e) => setNewRoll({ ...newRoll, name: e.target.value })}
        />
        <select
          value={newRoll.isActive}
          onChange={(e) => setNewRoll({ ...newRoll, isActive: e.target.value === "true" })}
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
        <button className="btn btn-primary" onClick={handleAddRoll}>Add</button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>IsActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rollList.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.isActive ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => setEditRoll({ id: data.id, name: data.name, isActive: data.isActive })}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteRoll(data.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Roll Section */}
      {editRoll && (
        <div className="mb-3">
          <h3>Edit Roll</h3>
          <input
            type="text"
            placeholder="Name"
            value={editRoll.name}
            onChange={(e) => setEditRoll({ ...editRoll, name: e.target.value })}
          />
          <select
            value={editRoll.isActive}
            onChange={(e) => setEditRoll({ ...editRoll, isActive: e.target.value === "true" })}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
          <button className="btn btn-success" onClick={handleEditRoll}>Save</button>
          <button className="btn btn-secondary" onClick={() => setEditRoll(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Roll;