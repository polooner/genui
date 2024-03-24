import fetch from 'node-fetch';

// Define your Zenserp API key
const apiKey = '46269a40-e931-11ee-8c8e-958f352332f8';

// Function to fetch the top image URL based on a search query
export async function fetchTopImageUrl(
  searchQuery: string
): Promise<string | undefined> {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = `https://app.zenserp.com/api/v2/search?q=${encodeURIComponent(
    searchQuery
  )}&tbm=isch&num=1&apikey=${apiKey}`;
  const url = proxyUrl + targetUrl;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.image_results && data.image_results.length > 0) {
      const topImageUrl = data.image_results[0].sourceUrl;
      return topImageUrl;
    } else {
      console.error('No image results found.');
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching top image URL:', error);
    return undefined;
  }
}
