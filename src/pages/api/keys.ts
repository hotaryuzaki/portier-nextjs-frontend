import { NextApiRequest, NextApiResponse } from 'next';
import { getKeys, createKey, updateKey, deleteKey } from '../../services/keyService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const keys = await getKeys();
      res.status(200).json(keys);
      break;
    case 'POST':
      const newKey = await createKey(req.body);
      res.status(201).json(newKey);
      break;
    case 'PUT':
      const updatedKey = await updateKey(req.body.id, req.body);
      res.status(200).json(updatedKey);
      break;
    case 'DELETE':
      await deleteKey(req.body.id);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}