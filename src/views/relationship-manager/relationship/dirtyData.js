/**
 * @description 脏数据
 */

export default {
  'relationships': [
    {
      'destinationDatasetId': 'CMDB.ASSET',
      'destinationInstanceId': '35f7e44364ee483ab00ce142c192e8d4',
      'sourceInstanceId': '539bd9c0a0be4e36be0e36145d5cda7a',
      'destinationClassId': 'DC:LogicalServer',
      'classId': 'DC:Dependency',
      'instanceId': 'ac594cee356b445d9f85810e39dd2901',
      'sourceDatasetId': 'CMDB.ASSET',
      'name': '',
      'datasetId': 'CMDB.ASSET',
      'id': 'ac594cee356b445d9f85810e39dd2901',
      'sourceClassId': 'DC:ApplicationSystem',
      'lastModifyDate': '2020-07-11 17:25:15',
      'createDate': '2020-07-11 17:25:15'
    },
    {
      'destinationDatasetId': 'CMDB.ASSET',
      'destinationInstanceId': '252e83b481f34a95a3d05f537ad05bbe',
      'sourceInstanceId': '35f7e44364ee483ab00ce142c192e8d4',
      'destinationClassId': 'DC:NetworkCard',
      'classId': 'DC:Install',
      'instanceId': 'c9bf8699dfa4457589a7f2d683696fc9',
      'sourceDatasetId': 'CMDB.ASSET',
      'name': '',
      'datasetId': 'CMDB.ASSET',
      'id': 'c9bf8699dfa4457589a7f2d683696fc9',
      'sourceClassId': 'DC:LogicalServer',
      'lastModifyDate': '2020-07-11 17:49:32',
      'createDate': '2020-07-11 17:49:32'
    }
  ],
  'cis': [
    {
      'chineseShortName': '手机银行',
      'classId': 'DC:ApplicationSystem',
      'appSystemRank': 'C',
      'instanceId': '539bd9c0a0be4e36be0e36145d5cda7a',
      'englishFullName': 'EBANK',
      'appSystemId': 'NT-EBANK',
      'name': '手机银行(NT-EBANK)',
      'datasetId': 'CMDB.ASSET',
      'id': 'cc3b17450bbb4da1a89a98de17f77fdf',
      'chineseFullName': '手机银行',
      'lastModifyDate': '2020-07-11 14:01:01.0',
      'createDate': '2020-07-11 14:01:01.0'
    },
    {
      'hostName': 'HP-001',
      'item': '服务器',
      'catalog': '系统',
      'type': '逻辑实体',
      'appNodeName': 'WEB-01',
      'normalizationInfo': '[]',
      'classId': 'DC:LogicalServer',
      'instanceId': '35f7e44364ee483ab00ce142c192e8d4',
      'appSystemId': 'NT-EBANK',
      'appNodeType': 'WEB',
      'name': 'HP-001',
      'datasetId': 'CMDB.ASSET',
      'normalizationStatus': '1',
      'id': 'f93cbd543e5f42f2a2b4e82a7dc8820e',
      'lastModifyDate': '2020-07-11 17:25:15.0',
      'createDate': '2020-07-11 14:06:50.0'
    },
    {
      'hostName': 'HP-001',
      'driveVersion': '1.0',
      'driveType': '无',
      'ipAddress': '10.10.1.181',
      'binding': '是',
      'portStatus': '启用',
      'mac': '0ade.8fd0.1111',
      'speed': '1880',
      'characteristic': 'eth0',
      'path': '/dev/eth0',
      'masterORBackUp': '主',
      'classId': 'DC:NetworkCard',
      'instanceId': '252e83b481f34a95a3d05f537ad05bbe',
      'datasetId': 'CMDB.ASSET',
      'modelNumber': 'eth',
      'id': 'bac575f014624e319bc5a3993826d560',
      'firmwareVersion': '1.0',
      'lastModifyDate': '2020-07-11 17:49:32.0',
      'createDate': '2020-07-11 17:49:32.0'
    }
  ]
}
