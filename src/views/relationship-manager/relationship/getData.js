/**
 * @description 将脏数据中提取的有效数据，混入到正常的数据中，从而获取最终的结果数据
 */

/* 引入脏数据 */
import dirtyData from './dirtyData'
/* 引入正常数据 */
import goodData from './data'

/* 过滤脏数据为合适数据结构 */

/**
 * 过滤规则
 * 1. 取出classId，根据不同的classId进行label取值
 *    * 20201010
 *      + classId为 `DC:ApplicationSystem`时 取 `chineseShortName`
 *      + classId为 `DC:LogicalServer`时 取 `hostName`
 *      + classId为 `DC:NetworkCard`时 取 `hostName`
 * 2. 节点的属性映射：instanceId -> id
 * 3. 边的属性映射：destinationInstanceId -> target，sourceInstanceId  -> source
 */

export function filter20201010DirtyData() {
  const goodDataPrototype = JSON.parse(JSON.stringify(goodData))

  const classIdsMap = {
    'DC:ApplicationSystem': 'chineseShortName',
    'DC:LogicalServer': 'hostName',
    'DC:NetworkCard': 'hostName'
  }
  const idKey = 'instanceId'
  const targetKey = 'destinationInstanceId'
  const sourceKey = 'sourceInstanceId'

  const nodes = goodDataPrototype.graphData.nodes
  const edges = goodDataPrototype.graphData.edges
  const dirtyNodes = dirtyData.cis
  const dirtyEdges = dirtyData.relationships

  /* 第一步 */
  const [dcApplicationSystem, dcLogicalServer, dcNetworkCard] = dirtyNodes
  const [dcApplicationSystemKey, dcLogicalServerKey, dcNetworkCardKey] = Object.keys(classIdsMap)
  nodes[0].label = dcApplicationSystemKey + '@' + dcApplicationSystem[classIdsMap[dcApplicationSystem.classId]]
  nodes[1].label = dcLogicalServerKey + '@' + dcLogicalServer[classIdsMap[dcLogicalServer.classId]]
  nodes[2].label = dcNetworkCardKey + '@' + dcNetworkCard[classIdsMap[dcNetworkCard.classId]]

  /* 第二步 */
  nodes[0].id = dcApplicationSystem[idKey]
  nodes[1].id = dcLogicalServer[idKey]
  nodes[2].id = dcNetworkCard[idKey]

  /* 第三步 */
  edges[0].target = dirtyEdges[0][targetKey]
  edges[0].source = dirtyEdges[0][sourceKey]
  edges[1].target = dirtyEdges[1][targetKey]
  edges[1].source = dirtyEdges[1][sourceKey]

  return goodDataPrototype
}

/* filter20201010DirtyData的优化版本 */
export function filter20201010DirtyDataButRefactor() {
  const goodDataPrototype = JSON.parse(JSON.stringify(goodData))

  const classIdsMap = {
    'DC:ApplicationSystem': 'chineseShortName',
    'DC:LogicalServer': 'hostName',
    'DC:NetworkCard': 'hostName'
  }
  const idKey = 'instanceId'
  const targetKey = 'destinationInstanceId'
  const sourceKey = 'sourceInstanceId'

  const nodes = goodDataPrototype.graphData.nodes
  const edges = goodDataPrototype.graphData.edges
  const dirtyNodes = dirtyData.cis
  const dirtyEdges = dirtyData.relationships

  /* 第一步 */
  const [dcApplicationSystem, dcLogicalServer, dcNetworkCard] = dirtyNodes
  const [dcApplicationSystemKey, dcLogicalServerKey, dcNetworkCardKey] = Object.keys(classIdsMap)
  nodes[0].label = dcApplicationSystemKey + '@' + dcApplicationSystem[classIdsMap[dcApplicationSystem.classId]]
  nodes[1].label = dcLogicalServerKey + '@' + dcLogicalServer[classIdsMap[dcLogicalServer.classId]]
  nodes[2].label = dcNetworkCardKey + '@' + dcNetworkCard[classIdsMap[dcNetworkCard.classId]]

  /* 第二步 */
  nodes[0].id = dcApplicationSystem[idKey]
  nodes[1].id = dcLogicalServer[idKey]
  nodes[2].id = dcNetworkCard[idKey]

  /* 第三步 */
  edges[0].target = dirtyEdges[0][targetKey]
  edges[0].source = dirtyEdges[0][sourceKey]
  edges[1].target = dirtyEdges[1][targetKey]
  edges[1].source = dirtyEdges[1][sourceKey]

  return goodDataPrototype
}

export default function getData() {
  // return filter20201010DirtyData()
  return filter20201010DirtyDataButRefactor()
}
