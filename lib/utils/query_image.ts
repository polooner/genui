import fetch from 'node-fetch';
import * as fs from 'fs';

// Define your Zenserp API key
const apiKey = '46269a40-e931-11ee-8c8e-958f352332f8';

// Function to fetch the top image URL based on a search query
export async function fetchTopImageUrl(searchQuery: string): Promise<string | undefined> {
    // Prepend the CORS proxy URL to the target URL
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = `https://app.zenserp.com/api/v2/search?q=${encodeURIComponent(searchQuery)}&tbm=isch&num=1`;
    const url = proxyUrl + targetUrl;
    const headers = {
        'apikey': apiKey,
        // The proxy might require you to set an Origin header
        'Origin': 'http://localhost:3000'
    };

    try {
        const response = await fetch(url, { headers });
        const text = await response.text(); // Get the raw response text
        const data = JSON.parse(text); // Then try to parse it manually
        const topImageUrl = data.image_results[0].sourceUrl;

        return topImageUrl;
    } catch (error) {
        console.error('Error fetching top image URL:', error);
        return undefined; 
    }
}