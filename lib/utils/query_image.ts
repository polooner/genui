// import fetch from 'node-fetch';

// // Define your Zenserp API key
// const apiKey = '46269a40-e931-11ee-8c8e-958f352332f8';

// // Function to fetch the top image URL based on a search query
// export async function fetchTopImageUrl(
//   searchQuery: string
// ): Promise<string | undefined> {
//   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//   const targetUrl = `https://app.zenserp.com/api/v2/search?q=${encodeURIComponent(
//     searchQuery
//   )}&tbm=isch&num=1&apikey=${apiKey}`;
//   const url = proxyUrl + targetUrl;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);

//     if (data.image_results && data.image_results.length > 0) {
//       const topImageUrl = data.image_results[0].sourceUrl;
//       return topImageUrl;
//     } else {
//       console.error('No image results found.');
//       return undefined;
//     }
//   } catch (error) {
//     console.error('Error fetching top image URL:', error);
//     return undefined;
//   }
// }

// Define your Zenserp API key
const apiKey = 'b0522c50-ea00-11ee-9780-156486adbd1d';
const apiKey2 = 'e76c3150-ea00-11ee-8c11-45b8e8a7abbc';

// Function to fetch the top image URL based on a search query
export async function fetchTopImageUrl(
  searchQuery: string
): Promise<string | undefined> {
  // Prepend the CORS proxy URL to the target URL
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = `https://app.zenserp.com/api/v2/search?q=${searchQuery}&tbm=isch&num=1`;

  let url = 'http://localhost:3000/api/fetchimage/';
  // let url = origin_url + '/api/fetchimage/'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ targetUrl: targetUrl, apiKey: apiKey }),
    }).then(async (res) => await res.json());

    console.log(response);

    const topImageUrl = response.data.image_results[0].sourceUrl;

    return topImageUrl;
  } catch (error) {
    console.error('Error fetching top image URL:', error);
    return undefined;
  }
}

// async function main() {
//   const searchQuery = 'coffee';

//   try {
//     const topImageUrl = await fetchTopImageUrl(searchQuery);
//     if (topImageUrl) {
//       console.log('Top image URL:', topImageUrl);
//     } else {
//       console.log('No top image found.');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// // Call the main function
// main();
