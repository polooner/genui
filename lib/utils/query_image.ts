import axios from 'axios';
import * as fs from 'fs';

// Replace these values with your actual API key and search engine ID
const API_KEY: string = 'AIzaSyABGbTCFJzPqHMgkRazaWHVpd5OpNbhqmw';
const CX: string = 'a75b13ac744f14267';
const query: string = 'Coffee';

// API endpoint
const url: string = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&searchType=image&q=${query}`;

// Send GET request
axios
  .get(url)
  .then((response) => {
    // Check if request was successful
    if (response.status === 200) {
      // Parse JSON response
      const data = response.data;

      // Extract image URLs
      const imageUrls: string[] = data.items
        .slice(0, 5)
        .map((item: any) => item.link);

      // Download images
      imageUrls.forEach(async (url: string, i: number) => {
        const imgResponse = await axios.get(url, {
          responseType: 'arraybuffer',
        });
        fs.writeFileSync(
          `image_${i + 1}.jpg`,
          Buffer.from(imgResponse.data, 'binary')
        );
      });
    } else {
      console.log('Error:', response.status);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
