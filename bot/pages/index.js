import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Input, Table, Select } from 'antd';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import { boardTableColumns, dataSource } from '../components/tabledata'

//데이터 리랜더링 라이브로 띄어주기

//입력 받는 값 제대로 받기(expireTime)
//
export default function Home() {
  const [minute, setMinute] = useState("")
  const [count, setCount] = useState("")
  const [runCount, setRunCount] = useState(0)
  const [firstCharge, setfirstCharge] = useState("")
  const [secondCharge, setSecondCharge] = useState("")
  const [optionCode, setOptionCode] = useState("")
  // const [expireTime, setExpireTime] = useState("")
  const [orderedAmount, setOrderedAmount] = useState("")
  const [currency, setCurrency] = useState("")
  const [callPut, setCallPut] = useState("")
  const [result, setResult] = useState("")
  const [dataList, setDatadList] = useState([])

  const [loading, setLoading] = useState(false)

  let term = 1; 
  let now = new Date().getTime();
  let expireTime = now - (now % 60000) + (60000 * term);
  
  const sendData = useCallback(async () => {
    // if(!minute || !count || !firstCharge || !secondCharge || callPut){
    //   return alert("값 입력 요망")
    // }
    return axios.post('http://localhost:3001/routes/route', {
      minute: minute,
      count: count,
      firstCharge: firstCharge,
      secondCharge: secondCharge,
      optionCode: "Bitcoin", 
      expireTime: 10, 
      currency: 840, 
      callPut: Number(callPut), 
    })
      .then((res) => {
        setLoading(true)
        worker()
      })
      .catch((err) => {
        console.log(err);
      })
  })

  const worker = async () => {
    return axios.post('http://localhost:3001/routes/worker', {
      minute: minute,
      count: count,
      firstCharge: firstCharge,
      secondCharge: secondCharge,
      optionCode: "Bitcoin", 
      expireTime: 10, 
      orderedAmount: 10, 
      currency: 840, 
      callPut: Number(callPut), 
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getData = async () => {
    return axios.post('http://localhost:3001/routes/getdata')
      .then((res) => {
        console.log(";;")

        setRunCount(res.data.data[0].id)
        setDatadList(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  
  useEffect(() => {
    getData()
  }, [runCount])

  const { Option } = Select;
  function handleChange(value) {
    setCallPut(value)
  }
  return (
    <div className={styles.mainContainer}>
      <div>
        <Input type="text" className={styles.input} value={minute} onChange={(e => { setMinute(e.target.value) })}></Input>분 마다
      </div>
      <div>
        <Input type="text" className={styles.input} value={count} onChange={(e => { setCount(e.target.value) })} ></Input> 회를
      </div>
      <div>
        <Input type="number" className={styles.input} value={firstCharge} onChange={(e => { setfirstCharge(e.target.value) })}></Input> ~
      <Input type="number" className={styles.input} value={secondCharge} onChange={(e => { setSecondCharge(e.target.value) })}></Input> 금액으로<br />
        <Select className={styles.input} defaultValue="Call" value={callPut} onChange={handleChange}>
          <Option value={"1"}>Call</Option>
          <Option value={-"1"}>Put</Option>
        </Select>
      </div>
      <Button onClick={sendData} >요청</Button>
      {/* loading={loading} */}

      {/* <div>
        <Table>
          
        </Table>
      </div> */}

      <div>
        <Table columns={boardTableColumns} dataSource={dataSource(dataList)} pagination={{ position: ['bottomCenter'], pageSize: 10 }} scroll={{ y: 550 }} />
      </div>
    </div>

  )
}
