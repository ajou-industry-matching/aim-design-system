"use client";

import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandList,
  EditorCommandItem,
  EditorCommandEmpty,
} from "novel";
import {
  StarterKit,
  UpdatedImage,
  TiptapLink,
  Placeholder,
  TextStyle,
  Color,
  Command,
  createSuggestionItems,
  handleCommandNavigation,
  renderItems,
} from "novel";
import { useMemo } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Image as ImageIcon,
} from "lucide-react";

interface PortfolioContentEditorProps {
  content: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}

// Suggestion items를 컴포넌트 외부에 정의
const suggestionItems = createSuggestionItems([
  {
    title: "제목 1",
    description: "큰 제목",
    searchTerms: ["heading1", "h1", "제목1"],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "제목 2",
    description: "중간 제목",
    searchTerms: ["heading2", "h2", "제목2"],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "제목 3",
    description: "작은 제목",
    searchTerms: ["heading3", "h3", "제목3"],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "불릿 리스트",
    description: "순서 없는 목록",
    searchTerms: ["bullet", "list", "ul", "불릿", "리스트"],
    icon: <List size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "숫자 리스트",
    description: "순서 있는 목록",
    searchTerms: ["numbered", "ordered", "ol", "숫자", "리스트"],
    icon: <ListOrdered size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "인용구",
    description: "인용 블록",
    searchTerms: ["quote", "blockquote", "인용"],
    icon: <Quote size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: "코드 블록",
    description: "코드를 표시합니다",
    searchTerms: ["code", "codeblock", "코드"],
    icon: <Code size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: "이미지",
    description: "이미지 삽입",
    searchTerms: ["image", "img", "이미지", "사진"],
    icon: <ImageIcon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      const url = window.prompt("이미지 URL을 입력하세요:");
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    },
  },
]);

// Command Extension 설정
const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});

export function PortfolioContentEditor({
  content,
  onChange,
  editable = true,
}: PortfolioContentEditorProps) {
  if (!editable) {
    return (
      <div
        className="ProseMirror"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className="w-full border border-border-default rounded-lg bg-white">
      <EditorRoot>
        <EditorContent
          extensions={[
            StarterKit.configure({
              heading: {
                levels: [1, 2, 3, 4, 5, 6],
              },
            }),
            UpdatedImage,
            TiptapLink.configure({
              openOnClick: false,
            }),
            Placeholder.configure({
              placeholder: "포트폴리오 내용을 작성해주세요... (/ 를 입력하여 명령어 메뉴를 열 수 있습니다)",
            }),
            slashCommand,
            TextStyle,
            Color,
          ]}
          editable={editable}
          onUpdate={({ editor }) => {
            if (onChange) {
              onChange(editor.getHTML());
            }
          }}
          editorProps={{
            attributes: {
              class: "focus:outline-none",
            },
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
          }}
          className="w-full"
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-border bg-white px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              명령어가 없습니다
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent cursor-pointer"
                  key={item.title}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
