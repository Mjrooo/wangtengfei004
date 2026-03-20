export interface GrainQualityData {
  id: string;
  moisture: number;
  density: number;
  grade: '一等' | '二等' | '三等' | '不合格';
  timestamp: string;
}

export interface WarningInfo {
  id: string;
  type: '霉变' | '虫蛀' | '杂质' | '水分异常' | '火灾' | '漏水';
  location: string;
  status: '待处理' | '处理中' | '已解决';
  time: string;
  severity: 'low' | 'medium' | 'high';
}

export interface FarmerInfo {
  id: string;
  name: string;
  area: number;
  historyCount: number;
  credit: '优' | '良' | '中';
  tags: string[];
}

export interface StorageEnv {
  id: string;
  temp: number;
  humidity: number;
  status: '正常' | '异常';
}
