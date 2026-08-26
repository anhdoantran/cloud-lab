import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: ''
  })

  // Gọi API lấy danh sách sinh viên qua Proxy
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

  // Gửi API thêm sinh viên mới qua Proxy
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Thêm sinh viên thành công!')
        setFormData({ studentId: '', name: '', email: '' })
        fetchStudents()
      } else {
        alert('Lỗi: Không thể thêm sinh viên vào Database!')
      }
    } catch (error) {
      console.error('Lỗi gửi dữ liệu:', error)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Quản lý sinh viên</h1>

      <h2>Thêm sinh viên mới</h2>
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
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Thêm sinh viên
        </button>
      </form>

      <h2>Danh sách sinh viên</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ background: '#f2f2f2', color: '#333' }}>
            <th>MSSV</th>
            <th>Họ và tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((st) => (
              <tr key={st._id}>
                <td>{st.studentId}</td>
                <td>{st.name}</td>
                <td>{st.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>Chưa có sinh viên nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App