import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TableContainer from "./../../../common/Table/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  TeacherDelete,
  TeacherDetail,
} from "../../../../redux/actions/teacher/teacheractions";
import CustomConfirm from "../../../common/CustomConfirm";
import Loading from "./../../../common/Loading";

const TeacherTableData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const { teacherDetail: data } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(TeacherDetail());
  }, []);

  const onOpen = (post) => {
    navigate(`${post.id}`);
  };

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        SearchAble: false,
        Cell: ({ row: { index } }) => {
          return index + 1;
        },
      },
      {
        Header: "Full Name",
        accessor: (d) => {
          if (d.middleName == null) {
            d.middleName = "";
          }
          return `${d.first_name} ${d.middleName} ${d.last_name}`;
        },
        SearchAble: true,
      },
      {
        Header: "Phone",
        accessor: "contact_no",
        SearchAble: true,
      },
      {
        Header: "Email",
        accessor: "email",
        SearchAble: true,
      },
      {
        Header: "TRN NO",
        accessor: "TRN",
        SearchAble: true,
      },
      {
        Header: "Address",
        accessor: "address",
        SearchAble: true,
      },
      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => onOpen(row.original)}
                className="btn-primary btn-1 btn-custom">
                Open
              </button>
              <button
                className="btn-danger btn-custom"
                onClick={() => handleDelete(row.original.id)}>
                Delete
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      {clickDelete && (
        <CustomConfirm
          title={"Delete Teacher"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={TeacherDelete}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {data ? <TableContainer columns={columns} data={data} /> : <Loading />}
      </div>
    </>
  );
};

export default TeacherTableData;
