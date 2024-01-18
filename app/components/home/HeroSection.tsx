import HeroMatrix from '@/app/components/home/HeroMatrix'

export default function HeroSection () {
  return (
    <>
      <div className="w-screen h-svh sm:max-h-[50svh] fixed top-0">
        <HeroMatrix />
      </div>
      <div className="w-screen h-svh sm:max-h-[50svh] pointer-events-none"></div>
    </>
  )
}