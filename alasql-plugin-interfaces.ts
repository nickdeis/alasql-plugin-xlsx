import {AlaSQLCallback} from "./alasql";

interface AlaSQLQuery {
  columns:Array<Object>;
  xcolumns:Object;
  selectGroup:Array<Object>;
  groupColumns:Object;
}

interface AlaSQLFrom {
  (customId:any,customOpts?:any,cb?:AlaSQLCallback,idx?:any,query?:AlaSQLQuery):any;
}

interface AlaSQLInto {
  (customId:any,customOpts:any,data:Array<Object>,columns?:Array<Object>,cb?:AlaSQLCallback):any;
}

interface AlaSQLLike {
  value:string
}


interface AlaSQLEngine {
  createDatabase?:(wdbid:any,args?:Array<Object>,dbid?:any,cb?:AlaSQLCallback) => void;
  dropDatabase?:(databaseid:any) => void;
  attachDatabase?:(databaseid:any,dbid?:any, args?:Array<Object>, params?:any, cb?:AlaSQLCallback) => void;
  createTable?:(databaseid:any, tableid:any, ifnotexists?:any, cb?:AlaSQLCallback) => void;
  dropTable?:(databaseid:any, tableid:any,ifexists?:any,cb?:AlaSQLCallback) => void;
  intoTable?:(databaseid:any, tableid:any,value?:Array<Object>,columns?:Array<Object>,cb?:AlaSQLCallback) => void;
  fromTable?:(databaseid:any, tableid:any,cb?:AlaSQLCallback,idx?:any,query?:AlaSQLQuery) => void;
  showDatabases?:(like:AlaSQLLike,cb?:AlaSQLCallback) => Array<Object>;
  loadTableData?:(databaseid:any, tableid:any) => void;
  commit?:(databaseid:any,cb?:AlaSQLCallback) => number;
  begin?:(databaseid:any,cb?:AlaSQLCallback) => number;
  rollback?:(databaseid:any,cb?:AlaSQLCallback) => void;
}

interface AlaSQLColumnCache {
  sum?:number;
  arr?:Array<Object>;
}

interface AlaSQLAggr {
  (v?:any,s?:any,acc?:AlaSQLColumnCache) : any;
}

