import React from "react";
import '@/styles/md.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';


export default function CodeCopyBtn({ content } : {content : string}) {
    const [copyOk, setCopyOk] = React.useState(false);
    
    const iconColor = copyOk ? '#dcdcdc' : '#dcdcdc'; // #0af20a
    const icon = copyOk ? faCheck : faCopy;
    
    const handleClick = () => {
        navigator.clipboard.writeText(content);
        console.log(content)
        
        setCopyOk(true);
        setTimeout(() => {
            setCopyOk(false);
        }, 500);
    }
    return (
        <div className="code-copy-btn">
            <button onClick={handleClick}>
                {copyOk ? ( 
                    <FontAwesomeIcon 
                        icon={faCheck} 
                        style={{color: iconColor}} 
                    /> ) : ( 
                    <FontAwesomeIcon 
                        icon={faCopy} 
                        style={{color: iconColor}} 
                    /> )
                }
                {/* <i className={`fas ${icon}`} onClick={handleClick} style={{color: iconColor}} /> */}
            </button>
        </div>
    )
}
