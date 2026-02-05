'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAdmin } from '@/lib/admin-context'
import { MessageCircle, X, Send, User, Building2 } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'admin'
  timestamp: Date
  read: boolean
}

interface ChatSession {
  id: string
  userName: string
  userPhone: string
  messages: Message[]
  createdAt: Date
  lastMessageAt: Date
  isActive: boolean
}

// Store chat sessions in localStorage
const CHAT_STORAGE_KEY = 'furniture_chat_sessions'
const USER_SESSION_KEY = 'furniture_user_chat_session'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function getChatSessions(): ChatSession[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(CHAT_STORAGE_KEY)
  if (stored) {
    const sessions = JSON.parse(stored)
    return sessions.map((s: ChatSession) => ({
      ...s,
      createdAt: new Date(s.createdAt),
      lastMessageAt: new Date(s.lastMessageAt),
      messages: s.messages.map((m: Message) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }))
    }))
  }
  return []
}

function saveChatSessions(sessions: ChatSession[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(sessions))
}

function getUserSession(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(USER_SESSION_KEY)
}

function setUserSession(sessionId: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(USER_SESSION_KEY, sessionId)
}

export function ChatWidget() {
  const { siteSettings } = useAdmin()
  const [isOpen, setIsOpen] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [message, setMessage] = useState('')
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load sessions and check for existing user session
  useEffect(() => {
    const loadedSessions = getChatSessions()
    setSessions(loadedSessions)
    
    const userSessionId = getUserSession()
    if (userSessionId) {
      const existingSession = loadedSessions.find(s => s.id === userSessionId)
      if (existingSession) {
        setCurrentSession(existingSession)
        setShowForm(false)
      }
    }
  }, [])

  // Poll for new messages
  useEffect(() => {
    if (!currentSession) return
    
    const interval = setInterval(() => {
      const loadedSessions = getChatSessions()
      const updatedSession = loadedSessions.find(s => s.id === currentSession.id)
      if (updatedSession) {
        setCurrentSession(updatedSession)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [currentSession?.id])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentSession?.messages])

  const startChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName.trim() || !userPhone.trim()) return

    const newSession: ChatSession = {
      id: generateId(),
      userName: userName.trim(),
      userPhone: userPhone.trim(),
      messages: [{
        id: generateId(),
        text: `مرحباً! أنا ${userName}، كيف يمكنني مساعدتك؟`,
        sender: 'admin',
        timestamp: new Date(),
        read: true
      }],
      createdAt: new Date(),
      lastMessageAt: new Date(),
      isActive: true
    }

    const updatedSessions = [...sessions, newSession]
    setSessions(updatedSessions)
    saveChatSessions(updatedSessions)
    setCurrentSession(newSession)
    setUserSession(newSession.id)
    setShowForm(false)
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !currentSession) return

    const newMessage: Message = {
      id: generateId(),
      text: message.trim(),
      sender: 'user',
      timestamp: new Date(),
      read: false
    }

    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, newMessage],
      lastMessageAt: new Date()
    }

    const updatedSessions = sessions.map(s => 
      s.id === currentSession.id ? updatedSession : s
    )

    setSessions(updatedSessions)
    saveChatSessions(updatedSessions)
    setCurrentSession(updatedSession)
    setMessage('')
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const unreadCount = currentSession?.messages.filter(m => m.sender === 'admin' && !m.read).length || 0

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-50 bg-accent text-accent-foreground p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
        aria-label="فتح المحادثة"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 left-4 md:bottom-24 md:left-6 z-50 w-[calc(100vw-2rem)] max-w-sm bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary-foreground/20 p-2 rounded-full">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">{siteSettings.siteName}</h3>
                <p className="text-xs text-primary-foreground/80">نحن هنا لمساعدتك</p>
              </div>
            </div>
          </div>

          {showForm ? (
            /* Start Chat Form */
            <form onSubmit={startChat} className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                أدخل بياناتك لبدء المحادثة
              </p>
              <div className="space-y-3">
                <Input
                  placeholder="الاسم"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <Input
                  placeholder="رقم الجوال"
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  required
                  dir="ltr"
                />
              </div>
              <Button type="submit" className="w-full">
                بدء المحادثة
              </Button>
            </form>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px]">
                {currentSession?.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.sender === 'user'
                          ? 'bg-accent text-accent-foreground rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-accent-foreground/70' : 'text-muted-foreground'}`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="p-3 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="اكتب رسالتك..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}

// Admin Chat Panel Component
export function AdminChatPanel() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)
  const [replyMessage, setReplyMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load and poll for sessions
  useEffect(() => {
    const loadSessions = () => {
      const loadedSessions = getChatSessions()
      setSessions(loadedSessions.sort((a, b) => 
        new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
      ))
      
      // Update selected session if it exists
      if (selectedSession) {
        const updated = loadedSessions.find(s => s.id === selectedSession.id)
        if (updated) setSelectedSession(updated)
      }
    }

    loadSessions()
    const interval = setInterval(loadSessions, 2000)
    return () => clearInterval(interval)
  }, [selectedSession?.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedSession?.messages])

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyMessage.trim() || !selectedSession) return

    const newMessage: Message = {
      id: generateId(),
      text: replyMessage.trim(),
      sender: 'admin',
      timestamp: new Date(),
      read: false
    }

    const updatedSession = {
      ...selectedSession,
      messages: [...selectedSession.messages, newMessage],
      lastMessageAt: new Date()
    }

    const updatedSessions = sessions.map(s => 
      s.id === selectedSession.id ? updatedSession : s
    )

    setSessions(updatedSessions)
    saveChatSessions(updatedSessions)
    setSelectedSession(updatedSession)
    setReplyMessage('')
  }

  const getUnreadCount = (session: ChatSession) => {
    return session.messages.filter(m => m.sender === 'user' && !m.read).length
  }

  const markAsRead = (session: ChatSession) => {
    const updatedSession = {
      ...session,
      messages: session.messages.map(m => ({ ...m, read: true }))
    }
    const updatedSessions = sessions.map(s => 
      s.id === session.id ? updatedSession : s
    )
    setSessions(updatedSessions)
    saveChatSessions(updatedSessions)
    setSelectedSession(updatedSession)
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      day: 'numeric',
      month: 'short'
    }).format(date)
  }

  return (
    <div className="grid md:grid-cols-3 gap-4 h-[600px]">
      {/* Sessions List */}
      <div className="border border-border rounded-xl overflow-hidden">
        <div className="bg-muted p-3 border-b border-border">
          <h3 className="font-semibold">المحادثات ({sessions.length})</h3>
        </div>
        <div className="overflow-y-auto h-[calc(100%-48px)]">
          {sessions.length === 0 ? (
            <p className="text-center text-muted-foreground p-4 text-sm">
              لا توجد محادثات
            </p>
          ) : (
            sessions.map((session) => {
              const unread = getUnreadCount(session)
              return (
                <button
                  key={session.id}
                  onClick={() => {
                    setSelectedSession(session)
                    markAsRead(session)
                  }}
                  className={`w-full p-3 text-right border-b border-border hover:bg-muted/50 transition-colors ${
                    selectedSession?.id === session.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{session.userName}</span>
                    {unread > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{session.userPhone}</p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {session.messages[session.messages.length - 1]?.text}
                  </p>
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* Chat View */}
      <div className="md:col-span-2 border border-border rounded-xl overflow-hidden flex flex-col">
        {selectedSession ? (
          <>
            {/* Chat Header */}
            <div className="bg-muted p-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-full">
                  <User className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{selectedSession.userName}</h3>
                  <p className="text-xs text-muted-foreground">{selectedSession.userPhone}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selectedSession.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'admin' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      msg.sender === 'admin'
                        ? 'bg-accent text-accent-foreground rounded-br-sm'
                        : 'bg-muted text-foreground rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.sender === 'admin' ? 'text-accent-foreground/70' : 'text-muted-foreground'}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply Input */}
            <form onSubmit={sendReply} className="p-3 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="اكتب ردك..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!replyMessage.trim()}>
                  <Send className="h-4 w-4 ml-2" />
                  إرسال
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>اختر محادثة لعرضها</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
