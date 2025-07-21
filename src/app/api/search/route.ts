// search.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import OpenAI from 'openai'

const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
    const { query } = await req.json()
    if (!query) {
        return NextResponse.json({ error: 'Missing search query' }, { status: 400 })
    }
    
    // create embedding of search query
    const embResp = await openai.embeddings.create({
        model:"text-embedding-3-small",
        input: query,
    })

    const embedding = embResp.data[0].embedding; // actual embedding vector
    
    // now need to search for IDs of top matching weapons

    const { data: weapons, error } = await supabase
      .rpc('match_weapons', { query_embedding: embedding });

    // 3. Return the matched weapons
    return NextResponse.json({ weapons })
}