// File to generate embedding documents for weapons rows

import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import OpenAI from 'openai'

async function main() {

    console.log('ENV:', {
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0,30) + '…',
        SUPABASE_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        OPENAI_KEY: !!process.env.OPENAI_API_KEY,
  })


    const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


    console.log("Fetching weapons");
    const { data: weapons, error } = await supabase.from('weaponsText').select('*');

    if (error) {
        console.error("Error fetching weapons:", error);
        return;
    }

    // loop through weapons and create a doc for each one for embedding

    for (const weapon of weapons ?? []) {
        const doc = `
            ${weapon.name} is a ${weapon.category} that deals ${weapon.attack_text} damage.
            It scales with ${weapon.scaleswith_text} and has a description of ${weapon.description}
            `.trim();
        
            console.log("weapon doc: ", doc);

    
        // create embeddings using the doc text
        const resp = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: doc,
            encoding_format: "float",
        });

        const embedding = resp.data[0].embedding; // each embedding vector


        const {data, error} = await supabase
            .from("weaponsembedding")
            .upsert({
                weapon_id: weapon.id, // create new row with weapon ID and embedding vector
                embedding,
            });

        console.log({data, error});
    }

}

main().catch(console.error);