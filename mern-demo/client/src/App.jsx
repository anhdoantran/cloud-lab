import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: ''
  })
  const [editingId, setEditingId] = useState(null) // State lưu ID sinh viên đang sửa

  // Lấy danh sách sinh viên (GET)
  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students')
      const data = await response.json()
      setStudents(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Lỗi khi tải danh sách:', error)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Thêm mới hoặc Cập nhật sinh viên (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        // Câu 61: Gọi API PUT cập nhật sinh viên
        const response = await fetch(`/api/students/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (response.ok) {
          alert('Cập nhật thông tin sinh viên thành công!')
          setEditingId(null)
        }
      } else {
        // Thêm mới sinh viên
        const response = await fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (response.ok) {
          alert('Thêm sinh viên thành công!')
        }
      }
      setFormData({ studentId: '', name: '', email: '' })
      fetchStudents()
    } catch (error) {
      console.error('Lỗi gửi dữ liệu:', error)
    }
  }

  // Câu 61: Chuẩn bị form để sửa dữ liệu
  const handleEdit = (student) => {
    setEditingId(student._id)
    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email
    })
  }

  // Câu 62: Gọi API DELETE để xóa sinh viên
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) {
      try {
        const response = await fetch(`/api/students/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          alert('Xóa sinh viên thành công!')
          fetchStudents() // Câu 63: Cập nhật lại danh sách sau khi xóa
        }
      } catch (error) {
        console.error('Lỗi xóa sinh viên:', error)
      }
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Quản lý sinh viên</h1>

      <h2>{editingId ? 'Cập nhật sinh viên' : 'Thêm sinh viên mới'}</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="studentId"
          placeholder="MSSV"
          value={formData.studentId}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer', marginRight: '5px' }}>
          {editingId ? 'Cập nhật' : 'Thêm sinh viên'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setFormData({ studentId: '', name: '', email: '' })
            }}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            Hủy
          </button>
        )}
      </form>

      <h2>Danh sách sinh viên</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ background: '#f2f2f2', color: '#333' }}>
            <th>MSSV</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((st) => (
              <tr key={st._id}>
                <td>{st.studentId}</td>
                <td>{st.name}</td>
                <td>{st.email}</td>
                <td>
                  <button onClick={() => handleEdit(st)} style={{ marginRight: '8px', cursor: 'pointer' }}>
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(st._id)} style={{ cursor: 'pointer', color: 'red' }}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Chưa có sinh viên nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App