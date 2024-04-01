import React, { useState, useCallback, useEffect } from "react";
import { Card, Pagination } from "antd";
import FormSearch from "./FormSearch";
import axios from "axios";
import Image from "next/image";

const Screen = (props) => {
  const [data, setData] = useState(null)
  const [modal, setModal] = useState({ open: false, data: null })
  const [page, setPage] = useState({ page: 1, page_size: 10 })

  // const funcGet = useCallback(async () => {
  //   const res = await axios.get(`https://randomuser.me/api/`, { params: { results: 20 } }).then((response) => response?.data)
  //   setData(res?.results)
  // }, [])

  const funcSearch = (value) => {
    console.log('value----->>>>>',value);
  }

  useEffect(() => {
    const funcGet = async () => {
      const res = await axios.get(`https://randomuser.me/api/`, { params: { results: 20 } }).then((response) => response?.data)
      setData(res?.results)
    }
    funcGet()
  }, [])

  console.log('data----->>>>>', data);

  return (
    <Card className="w-[90%]">
      <FormSearch onSearch={funcSearch}/>
      {data && data?.map((item, index) => {
        return (
          <div key={index} id={index}>
            <Image
              alt={`${item?.id?.name}`}
              src={`${item?.picture?.medium}`}
              width={50}
              height={50}
            />
            {`${item?.name?.first} ${item?.name?.last}`}
          </div>
        )
      })}
    </Card>
  )
}

export default Screen