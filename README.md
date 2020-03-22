
# 优化id：新建id生成器
## 需求描述
* 因为还没有使用数据库，所以id之前和name同名所以会出现bug。
* ID的原则：①一旦给了id就不能修改  ②id不能重复
* 因为先暂时写一个id生成函数缓一缓

## 步骤
1. 新建src/lip/createId.ts
```ts
//每次刷新后都是从localStorage读出id
let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

//creatId()函数会把id增加一个然后返回最新的id
function createId() {
  id++;
  window.localStorage.setItem('_idMax',id.toString());
  return id;
}

export default createId;
```

2. 那么修改tagListModel.ts里的create函数
```
 //往标签列表里面新增标签 ①如果已经有了就返回duplicated ②没有就往标签列表里面新增标签，保存，返回success
    create(name) {
      // this.data = [{id:'1', name:'1'}, {id:'2', name:'2'}]
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {return 'duplicated';}
      const id = createId().toString();           //每次新增标签都生成一个新id
      this.data.push({id: id, name: name});  
      this.save();
      return 'success';
    },
```

# 全局数据管理
## 需求
* 发现bug：在记账页面新增标签，但是新增的标签不会自动同步到标签页面，必须要刷新一下才行
* 原因：记账页面和标签页面都是各自获取标签列表的`tagListModel.fetch();`

## 小插曲
1. 先把recordListModel.ts改造成和tagListModel一样的
```
import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordListModel = {
  data: [] as RecordItem[],
  
  fetch() {
    this.data= JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data
  },  //获取数据
  
  create(record: RecordItem){
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.data.push(record2);
    this.save()
  },
 
 
  save() { return window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));} //保存数据
};
  export {recordListModel}
```
2. Money组件用到了这个，所以需要修改
