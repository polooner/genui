// export const POST = () => {

import { NextResponse } from "next/server";

// }
// export async function POST() {  
//     const res = await fetch('https://data.mongodb-api.com/...', {   
//         method: 'POST',    
//         headers: {      
//             'Content-Type': 'application/json',      
//             'API-Key': process.env.DATA_API_KEY!,    
//         },    
//         body: JSON.stringify({ time: new Date().toISOString() }),  
//     })   
//     const data = await res.json()   
//     return Response.json(data)
// }

export async function POST(request: Request) {
    const { targetUrl, apiKey } = await request.json();
    console.log(targetUrl)
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': apiKey,
      },
      body: JSON.stringify({ time: new Date().toISOString() }),
    });
  
    const data = await res.json();
    console.log("check 2")
    console.log(data)
    return NextResponse.json({data}, {status: 200});
  }