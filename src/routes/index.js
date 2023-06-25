import {threejsRouter} from './3d';
import {toolRouter} from './tool';
import {carRouter} from './car';
import {viewRouter} from './view';
import {systemRouter} from './system';
import {drawRouter} from './draw.js';

export const routers = [
  {
    "translation": null,
    "menuId": "41845e045f1911ebb98c0242ac11000e",
    "menuName": "工作看板",
    "menuIcon": "HomeOutlined",
    "menuType": "00015",
    "remark": "管理项目",
    "redirect": null,
    "order": 1,
    "fold": null,
    "hidden": false,
    "subMenu": null,
    "columns": null,
    "inputs": null,
    "reMethod": null,
    "menuUrl": "/dashboard",
    "reComponent": "pages/Dashboard"
  },
  ...toolRouter,
  ...threejsRouter,
  ...carRouter,
  ...viewRouter,
  ...systemRouter,
  ...drawRouter
]
