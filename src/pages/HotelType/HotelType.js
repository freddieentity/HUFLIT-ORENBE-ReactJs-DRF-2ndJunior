import React from "react";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
  PartitionOutlined,
} from "@ant-design/icons";
import { Button, Layout, Table } from "antd";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import {
  getHotelTypes,
  deleteHotelType,
  postHotelType,
  patchHotelType,
} from "./api";
import AddHotelType from "./AddHotelType";

function HotelType() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("add");
  const [hotelTypes, setHotelTypes] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [hoteltype, setHotelType] = useState({ id: null, name: "" });

  const loadHotelTypes = () =>
    getHotelTypes().then((res) => setHotelTypes(res.data));

  useEffect(() => {
    loadHotelTypes();
  }, []);
  const handlePost = (data) => {
    setLoading(true);
    postHotelType(data)
      .then((res) => {
        setLoading(false);
        setShowDrawer(false);
        toast.success(`${res.data.name} is created`);
        loadHotelTypes();
      })
      .catch((err) => {
        setLoading(false);
        setShowDrawer(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm("Are you sure to delete it?")) {
      setLoading(true);
      deleteHotelType(id)
        .then((res) => {
          setLoading(false);
          toast.error(`${name} is deleted`);
          loadHotelTypes();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const handlePatch = (id, data) => {
    setLoading(true);
    patchHotelType(id, data)
      .then((res) => {
        setLoading(false);
        setShowDrawer(false);
        toast.success(`Edited to ${res.data.name}`);
        loadHotelTypes();
      })
      .catch((err) => {
        setLoading(false);
        setShowDrawer(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const columns = [
    {
      title: "Hotel Type",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Manage",
      key: "manage",
      align: "center",
      render: (text, hotelType) => (
        <span>
          <Button
            className="btn btn-primary mt-1"
            onClick={() => {
              setHotelType({ id: hotelType.id, name: hotelType.name });
              setMode("edit");
              setShowDrawer(true);
            }}
            icon={<EditOutlined />}
          ></Button>
          <Button
            className="btn btn-warning mt-1"
            onClick={() => handleDelete(hotelType.id, hotelType.name)}
            icon={<DeleteOutlined />}
          ></Button>
        </span>
      ),
    },
  ];
  return (
    <div className="container-fluid" style={{ marginTop: 65 }}>
      <div className="row">
        <div className="col-md-12">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div style={{ textAlign: "center" }}>
                <PartitionOutlined />
                <h4>Hotel Types Management</h4>
              </div>

              <Button
                type="primary"
                className="btn btn-success mt-1"
                icon={<PlusCircleFilled />}
                onClick={() => setShowDrawer(true)}
              >
                Add
              </Button>
              <Layout.Content>
                <Table
                  dataSource={hotelTypes}
                  columns={columns}
                  pagination={{ defaultPageSize: 4 }}
                  bordered
                  loading={loading}
                />
              </Layout.Content>

              {showDrawer && (
                <AddHotelType
                  show={showDrawer}
                  handleOnClose={() => {
                    setShowDrawer(false);
                    setHotelType({ name: "" });
                    setMode("add");
                  }}
                  handleOnFinish={mode === "edit" ? handlePatch : handlePost}
                  mode={mode}
                  hotelType={hoteltype}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default HotelType;
