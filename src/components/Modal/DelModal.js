import React from "react";
import { Modal } from "antd";
/**type==roleDel 角色删除  companyDel 企业删除 classGive 分派调休 */
function DelModal(props) {
  const { data, type, children } = props;
  const formatTitle = () => {
    let title = "";
    if (type === "classGive") {
      title = "调休";
    } else if (type === "stop") {
      title = "状态设置";
    } else {
      title = "删除";
    }
    return title;
  };
  const beforeSave = (val) => {
    props.save(data);
  };

  return (
    <Modal
      className="addModal"
      title={formatTitle()}
      visible
      onOk={() => beforeSave()}
      onCancel={() => props.close()}
    >
      <p>{children}</p>
    </Modal>
  );
}
export default DelModal;
