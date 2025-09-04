"use client"

import { useState, useEffect } from 'react'

export default function CodePlayground() {
  const [currentCode, setCurrentCode] = useState(0)
  const [displayedCode, setDisplayedCode] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const codeExamples = [
    {
      language: 'Python',
      code: `def snake_game():
    score = 0
    print("🐍 Snake Game Started!")
    while playing:
        move_snake()
        check_food()
        score += 10
    return f"Final Score: {score}"`,
      output: '🐍 Snake Game Started!\nFinal Score: 240'
    },
    {
      language: 'JavaScript',
      code: `function createWebsite() {
    const portfolio = {
        name: "Sara's Portfolio",
        projects: [],
        skills: ["HTML", "CSS", "JS"]
    };
    portfolio.projects.push("My First Website");
    return portfolio;
}`,
      output: `{
  name: "Sara's Portfolio",
  projects: ["My First Website"],
  skills: ["HTML", "CSS", "JS"]
}`
    },
    {
      language: 'Python',
      code: `import datetime

def homework_reminder():
    today = datetime.date.today()
    tasks = ["Math homework", "Science project"]
    
    for task in tasks:
        print(f"📚 {task} due soon!")
    
    return "All reminders sent! 🤖"`,
      output: '📚 Math homework due soon!\n📚 Science project due soon!\nAll reminders sent! 🤖'
    }
  ]

  useEffect(() => {
    const typeText = async () => {
      setIsTyping(true)
      setDisplayedCode('')
      const code = codeExamples[currentCode].code
      
      for (let i = 0; i <= code.length; i++) {
        setDisplayedCode(code.slice(0, i))
        await new Promise(resolve => setTimeout(resolve, 30))
      }
      
      setIsTyping(false)
      
      // Wait then move to next example
      setTimeout(() => {
        setCurrentCode((prev) => (prev + 1) % codeExamples.length)
      }, 3000)
    }

    typeText()
  }, [currentCode])

  return (
    <div className="bg-brand-navy rounded-2xl p-6 shadow-2xl border border-brand-slate w-[600px] mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="ml-4 text-gray-400 text-sm font-mono">
          {codeExamples[currentCode].language} - Live Demo
        </span>
      </div>
      
      <div className="bg-brand-black rounded-lg p-4 mb-4 h-72 overflow-hidden">
        <pre className="text-brand-emerald font-mono text-sm leading-relaxed h-full overflow-auto">
          <code className="whitespace-pre-wrap break-words">{displayedCode}</code>
          {isTyping && <span className="animate-pulse">|</span>}
        </pre>
      </div>
      
      <div className="bg-brand-slate rounded-lg p-4 border-l-4 border-brand-cyan h-24">
        <div className="text-gray-400 text-xs mb-2 font-mono">OUTPUT:</div>
        <pre className="text-brand-orange font-mono text-sm whitespace-pre-wrap overflow-auto break-words w-full">
          {!isTyping ? codeExamples[currentCode].output : ''}
        </pre>
      </div>
      
      <div className="flex justify-center mt-6 gap-2">
        {codeExamples.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentCode(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentCode ? 'bg-brand-cyan scale-125' : 'bg-brand-gray-600 hover:bg-brand-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  )
}