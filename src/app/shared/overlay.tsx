/**
 * * 悬浮菜单组件
 * @author shepard
 */
import React, { FunctionComponent, useRef, useEffect } from 'react';

// Components

// Interfaces

// Stylesheet
import './overlay.scss';

export interface OverlayProps {
    className?: string;
    trigger?: 'hover' | 'click';
}

const Overlay: FunctionComponent<OverlayProps> = (props) => {
    const {
        className,
        children,
        trigger
    } = props;

    const myNodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const myNode = myNodeRef.current;
        const myParentNode = myNode.parentElement;
        let hideTimeout: any = null;
        let isMeVisible = false;
        function hideMe() {
            isMeVisible = false;
            hideTimeout = setTimeout(() => {
                myNode.style.visibility = 'hidden';
            }, 600);
            myNode.style.opacity = '0';
        }
        function showMe() {
            isMeVisible = true;
            clearTimeout(hideTimeout);
            myNode.style.visibility = 'visible';
            myNode.style.opacity = '1';
        }

        if ((trigger || 'hover') === 'hover') {
            let isPointerInMe = false;
            let isPointerInParent = false;
            myParentNode.addEventListener('mouseenter', () => {
                isPointerInParent = true;
                showMe();
            });
            myNode.addEventListener('mouseenter', () => {
                isPointerInMe = true;
            });
            myParentNode.addEventListener('mouseleave', () => {
                isPointerInParent = false;
                if (!(isPointerInMe || isPointerInParent)) hideMe();
            });
            myNode.addEventListener('mouseleave', () => {
                isPointerInMe = false;
                if (!(isPointerInMe || isPointerInParent)) hideMe();
            });
        } else {
            myParentNode.addEventListener('click', () => {
                if (isMeVisible) hideMe(); else showMe();
            });
            document.addEventListener('click', ev => {
                console.log(ev.target, isMeVisible)
                if (isMeVisible && !myParentNode.contains(ev.target as any))
                    hideMe();
            })
        }
    }, [trigger]);

    return (
        <div style={{ visibility: 'hidden', opacity: '0' }}
            className={`overlay ${className || ''}`} ref={myNodeRef}>
            {children}
        </div>
    );
};

export default Overlay;