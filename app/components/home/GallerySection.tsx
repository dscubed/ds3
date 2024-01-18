import GallerySlides from "./GallerySlides";

export default function GallerySection () {
  return (
    <div className="my-40 sm:my-20">
      <div className="flex flex-col gap-10 max-w-screen-xl mx-auto">
        <GallerySlides />
      </div>
    </div>
  )
}