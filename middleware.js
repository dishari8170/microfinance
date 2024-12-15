import { NextResponse } from 'next/server';

export function middleware(req) {

    let  res=null;

    if (req.method === 'OPTIONS') {
        res=  new Response(JSON.stringify("reset"), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    if (res==null) {
        res = NextResponse.next();
    }

if ( req.headers.get('origin')){
    res.headers.set('Access-Control-Allow-Origin', req.headers.get('origin'));
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'content-type');

}


    return res;



}


export const config = {
    matcher: '/api/:path*', // Apply middleware to API routes only
};

