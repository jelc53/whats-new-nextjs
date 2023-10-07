'use client'
import '@/styles/md.css';
import React from "react";
import { useTheme } from "next-themes"
import ReactMarkdown from "react-markdown";
import type { CodeProps } from "react-markdown/lib/ast-to-react";

import remarkGfm from "remark-gfm";
import remarkMath from 'remark-math'
// import rehypeMathjax from 'rehype-mathjax'

// import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {materialLight, materialOceanic} from 'react-syntax-highlighter/dist/cjs/styles/prism'

// import { BlockMath, InlineMath } from "react-katex";
// import "katex/dist/katex.min.css";


function Markdown({ post } : {post : any}) {
    const {systemTheme, theme, setTheme} = useTheme()
    const currentTheme = theme === "system" ? systemTheme : theme

    return (
        <div className={`${currentTheme === 'dark' ? 'dark' : ''}`}>
            <div className="text-black markdown-content dark:text-white ">
                <ReactMarkdown 
                    children={post.content}
                    remarkPlugins={[[remarkGfm, remarkMath]]} 
                    // rehypePlugins={[[rehypeMathjax]]}
                    components={{
                        code({ node, inline, className, children, style, ...props } : CodeProps) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                            <SyntaxHighlighter
                                language={match[1]}
                                showLineNumbers={true}
                                style={currentTheme === 'dark' ? materialOceanic : materialLight}
                                customStyle={{
                                    marginTop: "-1rem", 
                                    marginBottom: "-1rem",
                                    marginLeft: "-2rem", 
                                    marginRight: "-2rem",
                                }}
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                            ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                            )
                        },
                    }}
                />
            </div>
        </div>
    )
};

export default Markdown;
