export async function fetchImages(search) {
  const params = new URLSearchParams({
    q: search.trim(),
    key: process.env.PIXABAY_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  try {
    const response = await fetch(
      `https://pixabay.com/api/?${params.toString()}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
