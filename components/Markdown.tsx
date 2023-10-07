'use client'
import '@/styles/md.css';
import { useTheme } from "next-themes"
import ReactMarkdown from "react-markdown";
import React, { useEffect, useState } from 'react';

import remarkGfm from "remark-gfm";
import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';
import rehypeMathjax from 'rehype-mathjax'
// import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import CodeCopyBtn from './codeCopyBtn';
import type { CodeProps } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {materialLight, materialOceanic} from 'react-syntax-highlighter/dist/cjs/styles/prism'


function Markdown({ content } : {content : any}) {
    const {systemTheme, theme, setTheme} = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
        // manually trigger MathJax to process the page again
        // if (window.MathJax) {
        //     window.MathJax.typesetPromise();
        // }
    }, []);

    if (!isMounted) {
        return null; // disable server-side rendering
    }
    
    return (
        <div className={`${currentTheme === 'dark' ? 'dark' : ''}`}>
            <div className="text-black markdown-content dark:text-white ">
                <ReactMarkdown 
                    children={content}
                    remarkPlugins={[[remarkGfm, remarkMath]]} 
                    rehypePlugins={[rehypeMathjax]}
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
                                            marginTop: "-1.5rem", 
                                            marginBottom: "-1.5rem",
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
