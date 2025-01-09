import { NextApiRequest, NextApiResponse } from 'next'
import axiosInstance from '../../utils/axiosInstance'
import { Copy } from '../../types/models'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axiosInstance.get<Copy[]>('/copies')
      res.status(200).json(response.data)
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch copies' })
    }
  }

  if (req.method === 'POST') {
    try {
      const copy: Copy = req.body
      const response = await axiosInstance.post('/copies', copy)
      res.status(201).json(response.data)
    } catch (e) {
      res.status(500).json({ error: 'Failed to create copy' })
    }
  }
}