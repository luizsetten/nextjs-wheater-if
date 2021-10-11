import { query as q } from 'faunadb';
import { fauna } from '../../services/fauna';

interface Record {
  ts: number;
  data: {
    stationId: string;
    name: string;
  }
}
interface QueryResultType {
  data: Record[];
}

async function handler(req, res) {

  // Mock de um request da estação
  // await fauna.query(
  //   q.Create(
  //     q.Collection('records'),
  //     { data: { name: 'John Doe 2', stationId: 'if-001' } }
  //   )
  // )

  const queryResult: QueryResultType = await fauna.query(
    q.Map(
      q.Paginate(
        q.Match(q.Index('records_by_station_id'), 'if-001'),
      ),
      q.Lambda(x => q.Get(x))
    )
  );

  const docs = queryResult?.data.map(item => {
    console.log(item)
    return {
      created_at: new Date(item.ts / 1000),
      ...item.data
    }
  })

  res.status(200).json(docs)
}

export default handler