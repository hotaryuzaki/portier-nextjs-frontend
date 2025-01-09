import { NextApiRequest, NextApiResponse } from 'next'
import axiosInstance from '../../utils/axiosInstance'
import { User } from '../../types/models'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axiosInstance.get<User[]>('/users')
      res.status(200).json(response.data)
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch users' })
    }
  }

  if (req.method === 'POST') {
    try {
      const user: User = req.body
      const response = await axiosInstance.post('/users', user)
      res.status(201).json(response.data)
    } catch (e) {
      res.status(500).json({ error: 'Failed to create user' })
    }
  }
}