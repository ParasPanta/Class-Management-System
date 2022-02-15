import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "../../../common/Table/TableContainer";
import moment from "moment";
import { SelectColumnFilter } from "../../../common/Table/filters";
import CustomConfirm from "../../../common/CustomConfirm";
import {
  DeleteTimetables,
  GetAdminTimetables,
} from "../../../../redux/actions/admin/adminaction";
import ChangeInput from "../../../common/Modal/ChangeInput";
import { addSlot } from "../../../values/AdminPanel/TimetableValues";

const ViewTimetableAdmin = () => {
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const dispatch = useDispatch();

  const { timetables } = useSelector((state) => state.admins);

  useEffect(() => {
    dispatch(GetAdminTimetables());
  }, []);

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

  const [click, setClick] = useState(false);

  const onSubmit = (data, e) => {
    e.target.reset();
    console.log(data);
    setClick(false);
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
        Header: "Day",
        accessor: "day",
        SearchAble: true,
        Filter: SelectColumnFilter,
      },
      {
        Header: "Time",
        accessor: (d) => {
          const startTime = moment(d.startTime, "HH").format("LT");
          const endTime = moment(d.endTime, "HH").format("LT");
          return `${startTime} to ${endTime}`;
        },
        SearchAble: true,
      },
      {
        Header: "Class",
        accessor: "assigned.grade",
        SearchAble: true,
        Filter: SelectColumnFilter,
      },
      {
        Header: "Subject",
        accessor: "assigned.subject",
        SearchAble: true,
      },
      {
        Header: "Teacher",
        accessor: "assigned.teacher",
        SearchAble: true,
      },
      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => setClick(!click)}
                className="btn-primary btn-1 btn-custom">
                Edit
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
      {click && (
        <ChangeInput
          onSubmit={onSubmit}
          valueArray={addSlot}
          click={click}
          setClick={setClick}
          heading={"View Class"}
          isCustom1={false} //For showing grid 3
          isCustom2={false} //For showing description
        />
      )}
      {clickDelete && (
        <CustomConfirm
          title={"Delete User"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={DeleteTimetables}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {timetables && <TableContainer columns={columns} data={timetables} />}
      </div>
    </>
  );
};

export default ViewTimetableAdmin;
