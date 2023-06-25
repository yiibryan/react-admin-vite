/**
 *  Vite Plugin for fast creating SVG sprites.
 * https://github.com/anncwb/vite-plugin-svg-icons
 */

import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import path from 'path';

export function configSvgIconsPlugin(isBuild: boolean) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]',
    /**
     * custom insert position
     * @default: body-last
     */
    // inject: 'body-first',//'body-last' | 'body-first',

    /**
     * custom dom id
     * @default: __svg__icons__dom__
     */
    customDomId: '__svg__icons__dom__',
  });
}


/*
* vite-plugin-svgr
* import { ReactComponent as Logo } from "./logo.svg";
* */
