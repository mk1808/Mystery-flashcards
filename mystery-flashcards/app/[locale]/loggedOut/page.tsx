
import Card from '@/components/Card';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import Link from 'next/link';

async function LoggedOut({ params }: { params: { locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);

  return (
    <Card title={<></>}>
      <div className="mt-20 mb-52 text-center text-4xl font-bold text-secondary ">
        {dictionary.common.userLoggedOut}
        <div className='mt-20'>{dictionary.common.sessionExpired}</div>
        <Link href={`/${params.locale}`} className="btn btn-primary mt-20" >{dictionary.common.mainPage}</Link>
      </div>
    </Card>
  )
}

export default LoggedOut