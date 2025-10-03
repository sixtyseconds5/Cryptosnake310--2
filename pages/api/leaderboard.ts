
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const weekStart = dateOfWeekStartISO()
    const { data, error } = await supabase.from('scores').select('fid, username, score, created_at').gte('created_at', weekStart)
    if (error) throw error
    const map = new Map()
    (data || []).forEach((r:any)=>{
      const prev = map.get(r.fid)
      if(!prev || r.score > prev.score) map.set(r.fid, { fid: r.fid, username: r.username, score: r.score })
    })
    const leaders = Array.from(map.values()).sort((a:any,b:any)=>b.score-a.score).slice(0,20)
    return res.status(200).json(leaders)
  } catch (err:any) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}

function dateOfWeekStartISO() {
  const d = new Date()
  const day = d.getUTCDay() || 7
  const diff = d.getUTCDate() - day + 1
  const monday = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), diff, 0,0,0))
  return monday.toISOString()
}
