
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.headers.cookie || ''
  const match = cookie.match(/session=([^;]+)/)
  if(!match) return res.status(200).json({})
  try {
    const user = JSON.parse(decodeURIComponent(match[1]))
    return res.status(200).json(user)
  } catch(e) {
    return res.status(200).json({})
  }
}
