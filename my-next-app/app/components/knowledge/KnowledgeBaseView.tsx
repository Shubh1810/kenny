'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface KnowledgeItem {
  id: string
  title: string
  content: string
  category: string
}

export default function KnowledgeBaseView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([
    {
      id: '1',
      title: 'Getting Started',
      content: 'Welcome to the knowledge base. Here you can find helpful information...',
      category: 'General'
    },
    // Add more initial items as needed
  ])

  const filteredItems = knowledgeItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Knowledge Base</h1>
      
      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search knowledge base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <Button>Add New Entry</Button>
      </div>

      <div className="space-y-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.content}</p>
            <span className="inline-block mt-2 text-sm bg-gray-100 px-2 py-1 rounded">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
