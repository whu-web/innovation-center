import React, { useState, FunctionComponent, useEffect, useRef, useContext, useCallback, CSSProperties, LegacyRef, useMemo } from 'react';
import localeCtx from './contexts/locale';

// Components
import Container from './shared/container';
import Text from './shared/text';
import { IconDownOutlined, IconMenu, IconSearch } from './shared/icons';
import Overlay from './shared/overlay';
import { FormattedMessage } from 'react-intl';
import Logo from './shared/logo';

// Interfaces

// Stylesheet
import './navbar.scss';
import { Link } from 'react-router-dom';

type MenuItem = 'news' | 'events' | 'teams' | 'achievements' | 'membership' | 'about' | 'language';
export interface NavBarProps {
    className?: string;
    style?: CSSProperties;
    innerRef?: LegacyRef<HTMLElement>;
}

const menuItems: { name: MenuItem, route?: string }[] = [
    { name: 'news', route: '/news' },
    { name: 'events' },
    { name: 'teams' },
    { name: 'achievements' },
    { name: 'membership' },
    { name: 'about' },
    { name: 'language' }
];

const NavBar: FunctionComponent<NavBarProps> = (props) => {
    const { className, style, innerRef } = props;

    // 使用语言上下文
    const { locale, setLocale, availableLocales } = useContext(localeCtx);

    // 当前语言选择菜单项显示的语言（该菜单项轮播除当前语言外的其他语言）
    const [curMenuDisplayLocaleIdx, setCurMenuDisplayLocaleIdx] = useState<number>(availableLocales[0] === locale ? 1 : 0);
    // 语言菜单项DOM节点
    const langMenuActionNodeRef = useRef<HTMLDivElement>(null);
    // 当前语言选择菜单项是否处于鼠标悬浮状态
    const isMouseOverLang = useRef<boolean>(false);

    // 定时切换当前语言选择菜单项显示的语言，该effect在每次当前显示改变导致重新渲染后被调用
    useEffect(() => {
        const lastTimeout = setInterval(() => {
            if (isMouseOverLang.current) return;

            const nodeRef = langMenuActionNodeRef.current;
            nodeRef.classList.remove('navbar--menu--item--language--animation');
            const availableNum = availableLocales.length;
            const nextIdx = (curMenuDisplayLocaleIdx + 1) % availableNum;
            setCurMenuDisplayLocaleIdx(availableLocales[nextIdx] !== locale ? nextIdx : (nextIdx + 1) % availableNum);
            setTimeout(() => {
                nodeRef.classList.add('navbar--menu--item--language--animation');
            }, 100);    // 避免在移除动画CSS类后立即恢复
        }, 4000);
        return () => { clearInterval(lastTimeout); }     // 下次运行前清理本次Effect的interval
    }, [availableLocales, curMenuDisplayLocaleIdx, locale]);

    // 处理鼠标进出语言选择菜单项事件
    const handleMouseEnterLang = useCallback(() => {
        isMouseOverLang.current = true;
        const nodeRef = langMenuActionNodeRef.current;
        nodeRef.style.opacity = '1';
        nodeRef.classList.remove('navbar--menu--item--language--animation');
    }, []);

    const handleMouseLeaveLang = useCallback(() => {
        isMouseOverLang.current = false;
        langMenuActionNodeRef.current.style.opacity = null;
    }, []);

    const menu = useMemo(() => (<>
        {menuItems.map((elem) => {
            const { name, route } = elem;
            return (name !== 'language' ? (
                <Link to={route ? route : '/'} className='navbar--menu--item container-center' key={name}>
                    <Text id={`navbar.menuitem.${name}`} />
                    <div className='navbar--menu--item--line' />
                </Link>)
                : null);
        })}
    </>), []);

    return (
        <nav className={`navbar ${className || ''}`} style={style} ref={innerRef}>
            {/* LOGO */}
            <Link to='/' className='navbar--logo-link-wrapper'>
                <Logo className='navbar--logo' />
            </Link>
            {/* 菜单栏 */}
            <Container className='navbar--menu' justify='end'>
                {menu}
                {/* 单独处理语言选择菜单项 */}
                <div ref={langMenuActionNodeRef}
                    onMouseEnter={handleMouseEnterLang} onMouseLeave={handleMouseLeaveLang}
                    className='navbar--menu--item navbar--menu--item--language container-center navbar--menu--item--language--animation'>
                    <Text id={`navbar.menuitem.language.${availableLocales[curMenuDisplayLocaleIdx]}`} />
                    <div className='navbar--menu--item--language--icon-wrapper container-center'>
                        <IconDownOutlined className='navbar--menu--item--language--icon' />
                    </div>
                    <Overlay className='navbar--menu--item--language--overlay' trigger='hover'>{
                        availableLocales.map(elem => (elem !== locale ? (
                            <div key={elem} onClick={() => setLocale(elem, locale)}
                                className='navbar--menu--item--language--overlay--item'>
                                <FormattedMessage id={`navbar.menuitem.language.${elem}`} />
                            </div>
                        ) : null))
                    }</Overlay>
                </div>
                {/* 搜索 */}
                <Container className='navbar--menu--item navbar--menu--item--search'>
                    <IconSearch />
                </Container>
                {/* 下拉菜单 */}
                <Container className='navbar--menu--item navbar--menu--item--menu'>
                    <IconMenu />
                    <Overlay className='navbar--menu--item--menu--overlay' trigger='click'>
                        <Container justify='center' className='navbar--menu--item--menu--overlay--logo-wrapper'>
                            <Logo />
                        </Container>
                        {menu}
                    </Overlay>
                </Container>
            </Container>
        </nav>
    );
};

export default NavBar;