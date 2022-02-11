import React, { FunctionComponent } from 'react';

// Components
import Container from './shared/container';
import { IconEmail, IconWechat, IconWeibo } from './shared/icons';
import { Row, Col } from 'antd';
import Text from './shared/text';
import Logo from './shared/logo';

// Interfaces

// Stylesheet
import './footer.scss';


export interface FooterProps {
    className?: string;
}

const Footer: FunctionComponent<FooterProps> = (props) => {

    return (
        <div className={`footer ${props.className || ''}`}>
            <div className='footer--contact container'>
                <Logo className='footer--logo' />
                <Container justify='end' align='start'>
                    <IconWechat />
                    <IconWeibo />
                    <IconEmail />
                </Container>
            </div>
            <Row className='footer--row'>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className='footer--col footer--col1'>
                    <a href='https://www.whu.edu.cn/' target='_blank'>
                        <Text id='footer.whu' />
                    </a>
                    <a href='http://rsgis.whu.edu.cn/' target='_blank'>
                        <Text id='footer.rs' />
                    </a>
                    <a href='https://github.com/whu-web' target='_blank'>
                        <Text id='footer.devTeam' />
                    </a>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className='footer--col footer--col2 container-column'>
                    <Text id='footer.copyright' />
                    <Text id='footer.address' />
                    <Text id='footer.icp' />
                </Col>
            </Row>
        </div>
    );
};

export default Footer;