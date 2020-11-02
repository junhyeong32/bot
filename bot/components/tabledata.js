export const boardTableColumns = [
    {
      title: 'No.',
      dataIndex: 'id',
      width: 40,
      align: "center"
    },
    {
      title: 'optionCode',
      dataIndex: 'optionCode',
      width: 150,
      align: "center"
    },
    {
      title: 'expireTime',
      dataIndex: 'expireTime',
      width: 52,
      align: "center"
    },
    {
      title: 'orderedAmount',
      dataIndex: 'orderedAmount',
      width: 150,
      align: "center"
    },
    {
      title: 'currency',
      dataIndex: 'currency',
      width: 100,
      align: "center"
    },
    {
      title: 'callPut',
      dataIndex: 'callPut',
      width: 54,
      align: "center"
    },
    {
      title: 'result',
      dataIndex: 'result',
      width: 100,
      align: "center"
    },
  ]

  export const dataSource = (dataList) => {
    let data = []

    dataList.map(({ id, optionCode, expireTime, orderedAmount, currency, callPut, result }) => {
        if(callPut === 1){
            callPut = "Call"
        }else{
            callPut = "Put"
        }
      data.push({
        key: id,
        id: id,
        optionCode: optionCode,
        expireTime: expireTime,
        orderedAmount: orderedAmount,
        currency: currency,
        callPut: callPut,
        result: result
      })
    })
    return data;
  }
