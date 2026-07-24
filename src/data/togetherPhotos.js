const photoModules = import.meta.glob('../assets/together/*.{jpeg,jpg,JPG,png,webp}', {
  eager: true,
  import: 'default',
})

export const TOGETHER_PHOTOS = Object.values(photoModules)
