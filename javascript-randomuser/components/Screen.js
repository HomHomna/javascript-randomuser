import React, { useState, useCallback, useEffect, useMemo, useReducer } from "react";
import { Card, Pagination, Spin, Modal, Button } from "antd";
import FormSearch from "./FormSearch";
import axios from "axios";
import Image from "next/image";
import { LoadingOutlined } from '@ant-design/icons';
import ModalDetail from "./ModalDetail";

const reducer = (state, action) => {
  switch (action.type) {
    case "default":
      return { ...state, default_data: action.payload, data: action.payload };
    case "show_data":
      return {
        ...state,
        show_data: action.payload
      };
    case "search_data":
      return {
        ...state,
        show_data: (action.payload?.age !== '' && action.payload?.age !== null && action.payload?.age !== undefined) ? state?.default_data?.filter((item) => item.dob.age == action.payload?.age) : state?.default_data?.slice((action.payload.page?.page - 1) * action.payload.page?.page_size, action.payload.page?.page * action.payload.page?.page_size),
        data: (action.payload?.age !== '' && action.payload?.age !== null && action.payload?.age !== undefined) ? state?.default_data?.filter((item) => item.dob.age == action.payload?.age) : state?.default_data
      };
    default:
      return { ...state };
  }
};

const Screen = (props) => {
  const [data, setData] = useState(null)
  const [state, dispatch] = useReducer(reducer, null);
  const [modal, setModal] = useState({ open: false, data: null })
  const [page, setPage] = useState({ page: 1, page_size: 10 })
  const [loading, setLoading] = useState(false)

  const show_data = useMemo(() => {
    if (data) {
      dispatch({ type: 'show_data', payload: data?.slice((page?.page - 1) * page?.page_size, page?.page * page?.page_size) })
      return data?.slice((page?.page - 1) * page?.page_size, page?.page * page?.page_size)
    }
  }, [data, page])

  const funcSearch = useCallback((value) => {
    dispatch({ type: 'search_data', payload: { age: value?.age, page: { page: 1, page_size: page?.page_size } } })
  }, [page])

  useEffect(() => {
    const funcGet = async () => {
      setLoading(true)
      const res = await axios.get(`https://randomuser.me/api/`, { params: { results: 100 } }).then((response) => response?.data)
      if (res) {
        setLoading(false)
        setData(res?.results)
        dispatch({ type: "default", payload: res?.results })
      }
    }
    funcGet()
  }, [])

  const onChangePagination = useCallback((page, page_size) => {
    setPage({ page: page, page_size: page_size })
  }, [])

  const options = useMemo(() => {
    if (state?.default_data) {
      const getAge = state.default_data.map((item) => item.dob.age)
      const uniqueAges = [...new Set(getAge.map(item => item))]
      return uniqueAges?.sort((a, b) => a - b)
    }
  }, [state?.default_data])

  return (
    <>
      <Card className="card">
        <FormSearch onSearch={funcSearch} options={options} />
        {loading ?
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
              />
            }
          />
          :
          <>
            <div className="layout_grid">
              {data && show_data && state.show_data?.map((item, index) => {
                return (
                  <div className="card_tumbnail" key={index} id={index} onClick={() => { setModal({ open: true, data: item }) }}>
                    <Image
                      alt={`${item?.id?.name}`}
                      src={`${item?.picture?.medium}`}
                      width={80}
                      height={80}
                    />
                    <br />
                    <div className="name_user">
                      <span className="text-bold">name : </span>{`${item?.name?.title}. ${item?.name?.first} ${item?.name?.last}`}
                    </div>
                    <div className="name_user">
                      <span className="text-bold">age : </span>{`${item?.dob?.age}`}
                    </div>
                    <div className="email_user">
                      <span className="text-bold">email : </span>{`${item?.email}`}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        }
        <br />
        <div className="pagination">
          <Pagination size="small" current={page.page} onChange={onChangePagination} total={state?.data?.length} />
        </div>
      </Card>
      <Modal
        title={<span className="text-bold">{`${modal?.data?.name?.title}. ${modal?.data?.name?.first} ${modal?.data?.name?.last}`}</span>}
        open={modal.open}
        onOk={() => setModal({ open: false, data: null })}
        onCancel={() => setModal({ open: false, data: null })}
        footer={<Button onClick={() => setModal({ open: false, data: null })} type="primary">Close</Button>}
      >
        <ModalDetail modal={modal} />
      </Modal>
    </>
  )
}

export default Screen