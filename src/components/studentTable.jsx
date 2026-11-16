
function studentTable({
  students,
  search,
  setSearch,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="table-card">

      <div className="table-header">

        <h3 className="section-heading">
          <span className="list-icon">☷</span>
          Students List
        </h3>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      <div className="table-responsive">

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {students.length > 0 ? (

              students.map((student, index) => (

                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="5" className="empty-message">
                  {search
                    ? "No matching students found."
                    : "No students added yet!"}
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      <div className="table-footer">
        Total Students: <strong>{students.length}</strong>
      </div>

    </div>
  );
}

export default studentTable;
