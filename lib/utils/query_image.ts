import * as fs from 'fs';
import fetch from 'node-fetch';

// Define your Zenserp API key
const apiKey = '46269a40-e931-11ee-8c8e-958f352332f8';

// Define the image query
const imageQuery = 'Coffee';

// Set up the API endpoint
const url = `https://app.zenserp.com/api/v2/search?q=${imageQuery}&tbm=isch&num=5`;

// Set up headers with your API key
const headers = {
  apikey: apiKey,
};

// Function to fetch and process images
async function fetchAndProcessImages() {
  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    const imageResults = data.image_results;

    // Extract top 3 image URLs
    const top3ImageUrls = imageResults
      .slice(0, 3)
      .map((result: any) => result.sourceUrl);

    // Package URLs into JSON format
    const jsonOutput = JSON.stringify({ top3ImageUrls });

    // Write JSON output to a file
    fs.writeFileSync('top3_image_urls.json', jsonOutput);

    console.log('Top 3 image URLs packaged into top3_image_urls.json');

    return jsonOutput; // Return JSON output
  } catch (error) {
    console.error('Error fetching and processing images:', error);
    return null;
  }
}

// Call the function and handle the returned JSON output
fetchAndProcessImages().then((jsonOutput) => {
  // Send out the JSON output here or perform further actions
  console.log('JSON output:', jsonOutput);
});
