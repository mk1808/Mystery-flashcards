
import Card from '@/components/Card';
import useLocaleStore from '@/stores/useLocaleStore';
import Link from 'next/link';

async function LoggedOut() {
  const { dictionary, locale } = useLocaleStore(state => state);

  return (
    <Card title={<></>}>
      <div className="mt-20 mb-52 text-center text-4xl font-bold text-secondary ">
        {dictionary.common.userLoggedOut}
        <div className='mt-20'>{dictionary.common.sessionExpired}</div>
        <Link href={`/${locale}`} className="btn btn-primary mt-20" >{dictionary.common.mainPage}</Link>
      </div>
    </Card>
  )
}

export default LoggedOut