import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

// Components
const logo = require('../../assets/logo.webp');

// Interfaces

// Stylesheet

export interface LogoProps {
    className?: string;
}

const Logo: FunctionComponent<LogoProps> = (props) => {

    const logoAltText = useIntl().messages['rsClub'] as string;

    return (
        <img className={`${props.className || ''}`} src={logo} alt={logoAltText} />
    );
};

export default Logo;