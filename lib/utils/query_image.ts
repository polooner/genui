import fetch from 'node-fetch';
import * as fs from 'fs';

// Define your Zenserp API key
const apiKey = '46269a40-e931-11ee-8c8e-958f352332f8';

// Function to fetch the top image URL based on a search query
async function fetchTopImageUrl(searchQuery: string): Promise<string | null> {
    const url = `https://app.zenserp.com/api/v2/search?q=${searchQuery}&tbm=isch&num=1`;
    const headers = {
        'apikey': apiKey
    };

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();
        const topImageUrl = data.image_results[0].sourceUrl;

        return topImageUrl;
    } catch (error) {
        console.error('Error fetching top image URL:', error);
        return null;
    }
}