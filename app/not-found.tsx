import Error from '@/app/components/Error'

export default function NotFound () {
  return <Error code={404} message="The page you are looking for does not exist. If you believe this is a mistake, please contact us via email." />
}