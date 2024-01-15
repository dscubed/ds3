import { compressImage } from '@/app/lib/utils'

export async function createThumbnail (file) {
  const acceptedTypes = [
    'image/webp',
    'image/png',
    'image/jpg',
    'image/jpeg',
  ]
  const bucketLimit = 0.95

  // Check file and file type
  if (!file || acceptedTypes.indexOf(file.type) === -1) {
    alert(`Please an image file of the following types: ${acceptedTypes.map(item => item.split('/')[1]).join(', ')}.`)
    return
  }

  // Check file size is in range
  const fileSizeMB = file.size / 1024 / 1024

  if (fileSizeMB > 50) {
    alert("File size cannot exceed 50 MB")
    return
  }

  if (fileSizeMB < 0.1) {
    alert("File size must exceed 100 KB")
    return
  }

  const image = await compressImage(file, {
    quality: 0.8,
    width: 500,
    height: 500,
    resize: 'cover',

    // Convert all images to JPEGs
    convertTypes: acceptedTypes,
    convertSize: 0,
  })
  const imageSizeMB = image.size / 1024 / 1024

  // Check if size after compression is under the Supabase bucket limit
  if (imageSizeMB > bucketLimit) {
    alert(`Image after compression (${imageSizeMB.toFixed(2)} MB) is greater than the maximum transferrable size (${bucketLimit} MB). Please select a smaller image.`)
    return
  }

  return image
}
