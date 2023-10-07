'use client'
import '@/styles/md.css';
import React from "react";
import { useTheme } from "next-themes"
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import remarkMath from 'remark-math'
// import rehypeMathjax from 'rehype-mathjax'
// import { BlockMath, InlineMath } from "react-katex";
// import "katex/dist/katex.min.css";

import CodeCopyBtn from './codeCopyBtn';
// import { IoIosCopy, IoIosCheckmarkCircleOutline } from 'react-icons/io'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import { CopyToClipboard } from 'react-copy-to-clipboard'

import type { CodeProps } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {materialLight, materialOceanic} from 'react-syntax-highlighter/dist/cjs/styles/prism'


function Markdown({ content } : {content : any}) {
    const {systemTheme, theme, setTheme} = useTheme()
    const currentTheme = theme === "system" ? systemTheme : theme
                                
    return (
        <div className={`${currentTheme === 'dark' ? 'dark' : ''}`}>
            <div className="text-black markdown-content dark:text-white ">
                <ReactMarkdown 
                    children={content}
                    remarkPlugins={[[remarkGfm, remarkMath]]} 
                    // rehypePlugins={[[rehypeMathjax]]}
                    components={{
                        code({ node, inline, className, children, style, ...props } : CodeProps) {
                            const match = /language-(\w+)/.exec(className || '')  
                            const codeText = String(children).replace(/\n$/, '')               
                            return !inline && match ? (
                                <div className="code-container">
                                    <CodeCopyBtn content={codeText} />
                                    <SyntaxHighlighter
                                        PreTag="div"
                                        children={codeText}
                                        language={match[1]}
                                        showLineNumbers={true}
                                        wrapLines={true}
                                        wrapLongLines={true}
                                        style={currentTheme === 'dark' ? materialOceanic : materialLight}
                                        customStyle={{
                                            marginTop: "-1rem", 
                                            marginBottom: "-1rem",
                                            marginLeft: "-2rem", 
                                            marginRight: "-2rem",
                                        }}
                                        {...props}
                                    />
                                </div>
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
    );
};

export default Markdown;
