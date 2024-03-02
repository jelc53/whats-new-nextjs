'use client'
import '@/styles/md.css';
import { useTheme } from "next-themes"
import React, { useEffect, useState } from 'react';

import remarkGfm from "remark-gfm";
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax'

import CodeCopyBtn from './codeCopyBtn';
import type { CodeProps } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {materialLight, materialOceanic} from 'react-syntax-highlighter/dist/cjs/styles/prism'

// import ReactMarkdown from "react-markdown";
import dynamic from 'next/dynamic';


// dynamic import of react-markdown with ssr turned off
const DynamicReactMarkdown = dynamic(() => import('react-markdown') as Promise<{default: React.ComponentType<any>}> , {
    ssr: false
});

function Markdown({ content } : {content : any}) {
    const {systemTheme, theme, setTheme} = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    // const [isMounted, setIsMounted] = useState(false);
    
    // useEffect(() => {
    //     setIsMounted(true);
    //     // manually trigger MathJax to process the page again
    //     setTimeout(() => {
    //         if (window.MathJax) {
    //             window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    //         }
    //     }, 100);
    // }, []);

    // if (!isMounted) {
    //     return null; // disable server-side rendering
    // }

    useEffect(() => {
        if (window.MathJax) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
        }
    }, []);
    
    return (
        <div className={`${currentTheme === 'dark' ? 'dark' : ''}`}>
            <div className="text-black markdown-content dark:text-white ">
                <DynamicReactMarkdown 
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
                                        wrapLines={false}
                                        wrapLongLines={false}
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
