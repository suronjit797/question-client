// import React from "react";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Form, Input, Button, Select } from "antd";
import { useEffect } from "react";
import { updateUserFn } from "../../transtackQuery/userApis";
import PropTypes from "prop-types";


const EditModal = ({ isModalOpen, editData, setIsModalOpen, }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

 console.log(editData)


 const {
    mutate: updateUser,
  } = useMutation({
    mutationKey: "updateUser",
    mutationFn: updateUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData, form]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {

    try {
      const values = await form.validateFields();
      console.log(values)
      updateUser({ id: editData._id, body: values })
    //   onSave(values);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  return (
    <Modal
      title="Edit User"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="edit_user">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input the email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please input the role!" }]}
        >
          <Select
              placeholder="Select Role"
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "admin",
                  label: "Admin",
                },
                {
                  value: "student",
                  label: "Student",
                },
              ]}
            />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditModal.propTypes = {
  editData: PropTypes.object,
  isModalOpen: PropTypes.object,
  setIsModalOpen: PropTypes.object,
};

export default EditModal;
