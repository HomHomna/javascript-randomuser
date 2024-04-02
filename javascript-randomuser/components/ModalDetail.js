import React, { useEffect } from "react";
import Image from "next/image";
import dayjs from "dayjs";

const ModalDetail = (props) => {
  const { modal } = props

  return (
    <div className="detail">
      {modal?.data !== null &&
        <Image
          alt={`${modal?.data?.id?.name}`}
          src={`${modal?.data?.picture?.large}`}
          width={220}
          height={220}
        />
      }
      <br />
      <div className="name_user">
        <span className="text-bold">name : </span>{`${modal?.data?.name?.title}. ${modal?.data?.name?.first} ${modal?.data?.name?.last}`}
      </div>
      <div className="name_user">
        <span className="text-bold">gender : </span>{`${modal?.data?.gender}`}
      </div>
      <div className="name_user">
        <span className="text-bold">date of birth : </span>{`${dayjs(modal?.data?.dob?.date).format('DD/MM/YYYY')}`}
      </div>
      <div className="name_user">
        <span className="text-bold">age : </span>{`${modal?.data?.dob?.age}`}
      </div>
      <div className="email_user">
        <span className="text-bold">email : </span>{`${modal?.data?.email}`}
      </div>
      <div className="email_user">
        <span className="text-bold">phone : </span>{`${modal?.data?.phone}`}
      </div>
      <div className="email_user">
        <span className="text-bold">gender : </span>{`${modal?.data?.gender}`}
      </div>
      <div className="email_user">
        <span className="text-bold">location : </span>{`${modal?.data?.location?.street?.number} ${modal?.data?.location?.street?.name} ${modal?.data?.location?.city} ${modal?.data?.location?.state} ${modal?.data?.location?.country} ${modal?.data?.location?.postcode}`}
      </div>
    </div>
  )
}

export default ModalDetail