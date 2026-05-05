import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Undo2,
  Redo2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: placeholder ?? "Write something…" }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.isEmpty ? "" : editor.getHTML())
    },
  })

  return (
    <div
      className={cn(
        "rounded-md border border-input bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className,
      )}
    >
      <EditorToolbar editor={editor} />
      <div className="border-t border-border">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

function ToolbarToggle({
  active,
  onToggle,
  children,
}: {
  active: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <Toggle
      size="sm"
      pressed={active}
      onPressedChange={onToggle}
      className="h-7 w-7 rounded-md p-0"
    >
      {children}
    </Toggle>
  )
}

function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-1.5 bg-muted/40">
      <ToolbarToggle
        active={editor.isActive("bold")}
        onToggle={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-3.5" />
      </ToolbarToggle>

      <ToolbarToggle
        active={editor.isActive("italic")}
        onToggle={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-3.5" />
      </ToolbarToggle>

      <ToolbarToggle
        active={editor.isActive("strike")}
        onToggle={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-3.5" />
      </ToolbarToggle>

      <div className="mx-0.5 h-4 w-px bg-border" />

      <ToolbarToggle
        active={editor.isActive("heading", { level: 2 })}
        onToggle={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="size-3.5" />
      </ToolbarToggle>

      <ToolbarToggle
        active={editor.isActive("heading", { level: 3 })}
        onToggle={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="size-3.5" />
      </ToolbarToggle>

      <div className="mx-0.5 h-4 w-px bg-border" />

      <ToolbarToggle
        active={editor.isActive("bulletList")}
        onToggle={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-3.5" />
      </ToolbarToggle>

      <ToolbarToggle
        active={editor.isActive("orderedList")}
        onToggle={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-3.5" />
      </ToolbarToggle>

      <ToolbarToggle
        active={editor.isActive("blockquote")}
        onToggle={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="size-3.5" />
      </ToolbarToggle>

      <div className="mx-0.5 h-4 w-px bg-border" />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="h-7 w-7 rounded-md"
      >
        <Undo2 className="size-3.5" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="h-7 w-7 rounded-md"
      >
        <Redo2 className="size-3.5" />
      </Button>
    </div>
  )
}
