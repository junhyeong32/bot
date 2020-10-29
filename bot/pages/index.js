import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Input } from 'antd';
import { useCallback, useState } from 'react';
import axios from 'axios';
import moment from 'moment'

export default function Home() {
  const [minute, setMinute] = useState("")
  const [count, setCount] = useState("")
  const [runCount, setRunCount] = useState(0)
  const [firstCharge, setfirstCharge] = useState("")
  const [secondCharge, setsecondCharge] = useState("")
  const [OptionCode, setOptionCode] = useState("")
  const [ExpireTime, setExpireTime] = useState("")
  const [OrderedAmount, setOrderedAmount] = useState("")
  const [Currency, setCurrency] = useState("")
  const [CallPut, setCallPut] = useState("")

  const ms = 60000;
  const dataReq = useCallback( async() => {
      return axios.post('https://api.galaxy365.biz/api/v1/trade/create', {
        OptionCode: "Bitcoin", // 종목 코드
        ExpireTime: Math.ceil(moment().unix()/60) * 60 *1000, // 만료시간
        OrderedAmount: 10, // 배팅 가격
        Currency: 840, // 840 고정값
        CallPut: 1, // 1이 콜 -1이 풋
      })
        .then((res) => {
          setRunCount(runCount + 1)
          
          if(Number(count) === runCount){
            clearInterval();
          }  
          console.log(res);
        
        })
        .catch((err) => {
          console.log(err);
        })
  }) 
  console.log(Number(minute) * ms)

  const getData = () => {
    setInterval(dataReq, Number(minute) * ms)
  }
 
  return (
    <div>
      <div>
      <Input type="text" value={minute} onChange={(e => {setMinute(e.target.value)})}></Input>분 마다
      </div>
      <div>
      <Input type="text" value={count} onChange={(e => {setCount(e.target.value)})} ></Input> 회를
      </div>
      <div>
      <Input type="text" value={firstCharge} onChange={(e => {setfirstCharge(e.target.value)})}></Input> ~ 
      <Input type="text" value={secondCharge} onChange={(e => {setsecondCharge(e.target.value)})}></Input> 금액으로
      </div>
      <Button onClick={getData}>요청</Button>
    </div>
  )
}
