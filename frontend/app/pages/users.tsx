import { FC } from 'react'

type User = {
  id: number
  name: string
  age: number
  created_at: string
  updated_at: string
}

type Response = {
  status: string
  data: User[]
}

type Props = {
  users: User[]
}

const Users: FC<Props> = ({
  users
}) => {
  return (
      <div>
        <h1>Users</h1>
        <ul>
          {users.map((user) =>
            <li key={user.id}>{user.name}({user.age})</li>
          )}
        </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch("http://backend:3000/users")
  const responseJson: Response = await response.json()

  return {
    props: {
      users: responseJson.data
    },
  }
}

export default Users
