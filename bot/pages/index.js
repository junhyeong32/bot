import styles from '../styles/Home.module.css'
import { Button, Input, Table, Select } from 'antd';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { boardTableColumns, dataSource } from '../components/tabledata'
import io from 'socket.io-client'


const socket = io("http://localhost:3002");
export default function Home() {
  const [minute, setMinute] = useState("")
  const [count, setCount] = useState("")
  const [firstCharge, setfirstCharge] = useState("")
  const [secondCharge, setSecondCharge] = useState("")
  const [callPut, setCallPut] = useState("")
  const [result, setResult] = useState("")
  const [dataList, setDatadList] = useState([])

  const [loading, setLoading] = useState(false)

  let term = 1;
  let now = new Date().getTime();
  let expireTime = now - (now % 60000) + (60000 * term);

  const sendData = useCallback(async () => {
    setLoading(true)
    return axios.post('http://localhost:3001/routes/request', {
      minute: minute,
      count: count,
      firstCharge: firstCharge,
      secondCharge: secondCharge,
      expireTime: expireTime,
      callPut: callPut,
    })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  })

  const getData = async () => {
    return axios.post('http://localhost:3001/routes/getdata')
      .then((res) => {
        setDatadList(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    socket.on('newData', (data) => {
      setResult(data)
      getData()
    });

    getData()
  }, [])

  const { Option } = Select;
  function handleChange(value) {
    setCallPut(value)
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputMainContainer}>
        <div className={styles.inputContainer}>
          <div>
            <Input type="text" className={styles.input} value={minute} onChange={(e => { setMinute(e.target.value) })}></Input>분 마다
          </div>
          <div>
            <Input type="text" className={styles.input} value={count} onChange={(e => { setCount(e.target.value) })} ></Input> 회를
          </div>
          <div>
            <Input type="number" className={styles.input} value={firstCharge} onChange={(e => { setfirstCharge(e.target.value) })}></Input> ~
            <Input type="number" className={styles.input} value={secondCharge} onChange={(e => { setSecondCharge(e.target.value) })}></Input> 금액으로<br />
          </div>
          <Select className={styles.input} defaultValue="Call" value={callPut} onChange={handleChange}>
              <Option value={"1"}>Call</Option>
              <Option value={-"1"}>Put</Option>
            </Select>
        </div>
        <Button onClick={sendData} loading={loading} className={styles.input} >요청</Button>
      </div>

      <div>
        <Table columns={boardTableColumns} dataSource={dataSource(dataList)} pagination={{ position: ['bottomCenter'], pageSize: 10 }} scroll={{ y: 550 }} />
      </div>
    </div>

  )
}


