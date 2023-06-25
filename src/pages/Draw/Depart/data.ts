export const departData = {
  deptNodes: [{
    id: 1,
    deptCode: "000",
    deptTitle: '流动性缺口',
    deptAmount: 3000,
    light: 'XXXXX',
    moderate: 'XXXXX',
    severe: 'XXXXX',
    bid: null,
    indexInfo: 'XXX/XXXX/XXXX'
  }, {
    id: 2,
    deptCode: "000",
    deptTitle: '流动性缺口',
    deptAmount: 3000,
    light: 'XXXXX',
    moderate: 'XXXXX',
    severe: 'XXXXX',
    bid: 1,
    indexInfo: 'XXX/XXXX/XXXX'
  }, {
    id: 3,
    deptCode: "000",
    deptTitle: '流动性缺口',
    deptAmount: 3000,
    light: 'XXXXX',
    moderate: 'XXXXX',
    severe: 'XXXXX',
    bid: 1,
    indexInfo: 'XXX/XXXX/XXXX'
  }, {
    id: 4,
    deptCode: "000",
    deptTitle: '流动性缺口',
    deptAmount: 3000,
    light: 'XXXXX',
    moderate: 'XXXXX',
    severe: 'XXXXX',
    bid: 2,
    indexInfo: 'XXX/XXXX/XXXX'
  }],
  deptEdges: [
    {
      source: '1',
      target: '2'
    }, {
      source: '1',
      target: '3'
    }, {
      source: '2',
      target: '4'
    }]
}
