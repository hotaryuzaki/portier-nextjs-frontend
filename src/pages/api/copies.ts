import { NextApiRequest, NextApiResponse } from 'next';
import { getCopies, createCopy, updateCopy, deleteCopy } from '../../services/copyService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const copies = await getCopies();
      res.status(200).json(copies);
      break;
    case 'POST':
      const newCopy = await createCopy(req.body);
      res.status(201).json(newCopy);
      break;
    case 'PUT':
      const updatedCopy = await updateCopy(req.body.id, req.body);
      res.status(200).json(updatedCopy);
      break;
    case 'DELETE':
      await deleteCopy(req.body.id);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}