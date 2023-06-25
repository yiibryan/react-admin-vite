export const drawRouter = [
  {
    "translation": null,
    "menuId": "4183b61b5f1911ebb98c0242ac110031",
    "menuName": "画图",
    "menuIcon": "FundViewOutlined",
    "menuType": "00016",
    "remark": "画图",
    "redirect": null,
    "order": 7,
    "fold": null,
    "hidden": false,
    "subMenu": [
      {
        "menuName": "人物关系图",
        "menuUrl": "/draw/member",
        "reComponent": "pages/Draw/GroupMember",
        "meta": {
          "dynamicKey": "TEST_001"
        }
      },
      {
        "menuName": "部门关系图",
        "menuUrl": "/draw/depart",
        "reComponent": "pages/Draw/Depart",
        "meta": {
          "dynamicKey": "TEST_002"
        }
      },
    ],
    "columns": null,
    "inputs": null,
    "reMethod": null,
    "menuUrl": "/draw",
    "reComponent": "layouts/BlankLayout"
  }
]
