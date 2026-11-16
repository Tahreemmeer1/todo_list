
function studentForm({
  formData,
  handleChange,
  handleSubmit,
  editingId,
}) {
  return (
    <div className="form-card">

      <h3 className="section-heading">
        <span className="plus-icon">+</span>
        {editingId !== null ? "Update Student" : "Add New Student"}
      </h3>

      <form onSubmit={handleSubmit} className="student-form">

        <div className="input-group">
          <label>
            Roll Number <span>*</span>
          </label>

          <input
            type="text"
            name="rollNumber"
            placeholder="Enter Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>
            Name <span>*</span>
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter Student Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>
            Age <span>*</span>
          </label>

          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            max="120"
            required
          />
        </div>

        <button type="submit" className="add-btn">
          {editingId !== null ? "Update Student" : "Add Student"}
        </button>

      </form>
    </div>
  );
}

export default studentForm;
