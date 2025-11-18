export function generateAvatarDataUrl(name: string, bg = '#E6F0FF', fg = '#1f7fff') {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'>
    <rect width='100%' height='100%' fill='${bg}' rx='20'/>
    <text x='50%' y='54%' text-anchor='middle' fill='${fg}' font-family='Inter, Arial, sans-serif' font-size='96' font-weight='700' dy='.35em'>${initials}</text>
  </svg>`

  const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22')
  return `data:image/svg+xml;utf8,${encoded}`
}
