import Table from '../components/Table'
import UserForm from '../components/UserForm'
import { User } from '../types/models'
import axiosInstance from '../utils/axiosInstance'

const Home = async () => {
  const response = await axiosInstance.get<User[]>('/users')
  const users = response.data

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Status', accessor: 'status' },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Table columns={columns} data={users} />
      <UserForm />
    </div>
  )
}

export default Home
