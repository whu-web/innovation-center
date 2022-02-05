/**
 * * SVG图标组件
 * @author shepard
 */
import React, { FunctionComponent } from 'react';

export interface IconProps {
    className?: string;
}


const IconSearch: FunctionComponent<IconProps> = (props) => <svg {...props} width="100%" height="100%" viewBox="0 0 44 44"><g><g transform="translate(-1360.000000, -40.000000)"><g transform="translate(1360.000000, 40.000000)"><rect opacity="0" x="0" y="0" width="44" height="44"></rect><path d="M30.3094149,27.0134048 L28.5399779,27.0134048 L27.9154707,26.3888977 C30.1012459,23.8561741 31.3849551,20.5948589 31.3849551,17.02129 C31.3849551,9.04147611 24.9317142,2.58823529 16.9519003,2.58823529 C8.97208642,2.58823529 2.58823529,9.07617095 2.58823529,17.02129 C2.58823529,24.9664091 9.04147611,31.4543447 17.02129,31.4543447 C20.5948589,31.4543447 23.8908689,30.1359407 26.3888977,27.9848604 L27.0134048,28.6093676 L27.0134048,30.3441098 L38.1157546,41.4117647 L41.4117647,38.1157546 C41.3770699,38.1157546 30.3094149,27.0134048 30.3094149,27.0134048 Z M16.9865952,27.0134048 C11.4701151,27.0134048 6.99448037,22.5377701 6.99448037,17.02129 C6.99448037,11.50481 11.4701151,7.02917521 16.9865952,7.02917521 C22.5030752,7.02917521 26.97871,11.50481 26.97871,17.02129 C26.97871,22.5377701 22.5030752,27.0134048 16.9865952,27.0134048 Z"></path></g></g></g></svg>;
const IconDown: FunctionComponent<IconProps> = (props) => <svg {...props} width="100%" height="100%" viewBox="0 0 25 22"><g><g transform="translate(-32.000000, -218.000000)"><g transform="translate(32.000000, 218.000000)"><rect opacity="0" x="0" y="0" width="25" height="22"></rect><path d="M19.4297907,6 L3.57020926,6 C3.0945184,6 2.82890422,6.44153547 3.1234945,6.74296834 L11.0532852,14.8264638 C11.2802646,15.0578454 11.7173207,15.0578454 11.9467148,14.8264638 L19.8765055,6.74296834 C20.1710958,6.44153547 19.9054816,6 19.4297907,6 Z"></path></g></g></g></svg>;
const IconDownOutlined: FunctionComponent<IconProps> = (props) => <svg {...props} width="100%" height="100%" viewBox="0 0 42 42"><g><g transform="translate(-334.000000, -522.000000)"><g transform="translate(334.000000, 522.000000)"><rect opacity="0" x="0" y="0" width="42" height="42"></rect><path d="M0.880397129,14.1374852 L18.7613857,31.9904155 C18.79909,32.0327353 18.8415178,32.0750965 18.8792222,32.1174577 C20.0577532,33.2941808 21.9622798,33.2941808 23.1408523,32.1174577 L41.1161018,14.1704144 C42.2946327,12.9937327 42.2946327,11.0921946 41.1161018,9.91547151 C39.9375708,8.73874845 38.0330441,8.73878982 36.8544717,9.91547151 L21.0146985,25.7303481 L5.14198577,9.88254229 C3.96345477,8.70581924 2.05892813,8.70581924 0.880355696,9.88254229 C-0.293451899,11.059224 -0.293451899,12.9607621 0.880355696,14.1374852 L0.880397129,14.1374852 Z"></path></g></g></g></svg>;


export {
    IconSearch, IconDown, IconDownOutlined
};