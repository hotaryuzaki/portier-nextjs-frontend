import { NextApiRequest, NextApiResponse } from 'next'
import axiosInstance from '../../utils/axiosInstance'
import { Key } from '../../types/models'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axiosInstance.get<Key[]>('/keys')
      res.status(200).json(response.data)
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch keys' })
    }
  }

  if (req.method === 'POST') {
    try {
      const key: Key = req.body
      const response = await axiosInstance.post('/keys', key)
      res.status(201).json(response.data)
    } catch (e) {
      res.status(500).json({ error: 'Failed to create key' })
    }
  }
}