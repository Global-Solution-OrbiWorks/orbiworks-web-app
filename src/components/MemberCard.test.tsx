import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MemberCard from './MemberCard'

const memberWithImage = {
  id: 'm1',
  name: 'Test User',
  rm: '123456',
  role: 'Front-end',
  imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#EEE"/></svg>'
}

const memberNoImage = {
  id: 'm2',
  name: 'Another Person',
  rm: '654321',
  role: undefined,
  imageUrl: ''
}

describe('MemberCard', () => {
  it('renders image when imageUrl is provided', () => {
    render(<MemberCard member={memberWithImage} />)
    const img = screen.getByAltText('Foto de Test User')
    expect(img).toBeInTheDocument()
  })

  it('renders initials when no imageUrl', () => {
    render(<MemberCard member={memberNoImage} />)
    const initials = screen.getByText('AP') // Another Person -> AP
    expect(initials).toBeInTheDocument()
  })

  it('shows RM badge', () => {
    render(<MemberCard member={memberWithImage} />)
    expect(screen.getByText(/RM 123456/)).toBeInTheDocument()
  })
})
