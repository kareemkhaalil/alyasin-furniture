"use client"

import { AdminWrapper } from "@/components/admin/admin-wrapper"
import { AdminChatPanel } from "@/components/chat-widget"

export default function AdminChatPage() {
  return (
    <AdminWrapper title="المحادثات" description="إدارة محادثات العملاء والرد عليهم">
      <AdminChatPanel />
    </AdminWrapper>
  )
}
