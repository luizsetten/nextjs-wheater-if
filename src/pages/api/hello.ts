import { query as q } from 'faunadb';
import { fauna } from '../../services/fauna';

async function handler(req, res) {

  await fauna.query(
    q.Create(
      q.Collection('records'),
      { data: { name: 'John Doe' } }
    )
  )

  const teste = await fauna.query(
    q.Get(
      q.Collection('records')
    )
  )
  res.status(200).json({ ...teste, date: new Date(teste.ts / 1000) })
}

export default handler