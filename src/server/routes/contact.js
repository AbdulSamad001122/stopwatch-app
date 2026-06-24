import { Router } from 'express';
const router = Router();
router.post('/contact', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid name or email format' });
  }
  const result = await db('contacts').insert({ name, email });
  res.status(201).json({ id: result[0] });
});
export default router;