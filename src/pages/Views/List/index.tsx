import {Card, Input} from 'antd';
import {memo, useCallback, useEffect, useState} from 'react';

interface PersonProp {
  name: string;
  age: number;
  index: number;
  changeAge: (index: number, value: string)=> void;
}

const Person = memo((props:PersonProp) => {
  const {name, age, index, changeAge }=props;
  return(
    <li >
      <h4>{name}</h4>
      <p>{age}</p>
      <Input placeholder="修改年龄" onChange={(e) => changeAge(index, e.target.value)}/>
    </li>
  )
})

const Persons = (props)=> {
  const {route: {meta}} = props;
  const {dynamicKey} = meta;
  const [persons, setPersons] = useState([{name:'张三',age:18},{name:'李四',age:18},{name:'王五',age:18}]);

  const changeAge = useCallback(
    (index, age) => {
      const newPerson = {...persons[index], age};
      const newPersons = persons.slice(0)
      newPersons.splice(index, 1, newPerson)
      setPersons(newPersons);
    },
    // eslint-disable-next-line
    []
  )

  console.log('meta', meta);
  useEffect(() => {
    if(dynamicKey){
      console.log('dynamicKey', dynamicKey);
    }
  }, [dynamicKey])

  return (
    <Card title="列表">
      <ul>
        {
          persons.map((person,index)=>
            <Person key={index} index={index} {...person} changeAge={changeAge}/>
          )
        }
      </ul>
    </Card>
  );
}

export default Persons;
