import { Drawer, Tabs, Timeline } from "antd";

export const ShowLeadInfo = (props:any)=>{
    const {selectedLead,onDrawerClose,drawerVisible}= props;
    const { TabPane } = Tabs;
    return (
        <Drawer
        title={
          selectedLead.firstName +
          " " +
          (selectedLead.lastName ? selectedLead.lastName : "") +
          " - " +
          selectedLead.company
        }
        placement="right"
        closable={false}
        onClose={onDrawerClose}
        visible={drawerVisible}
        className={"userDrawer"}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Lead Information" key="1">
            <div className="drawerInfo" id={selectedLead.email}>
              <label>Email: </label>
              <span>{selectedLead.email}</span>
              <label>First Name: {selectedLead.firstName}</label>
              <label>Last Name: {selectedLead.lastName}</label>
              <label>Phone Number: {selectedLead.phone}</label>
              <label>Role: {selectedLead.title}</label>
              <label>
                Managed by: {selectedLead.createdByName},{" "}
                {selectedLead.createdByRole}
              </label>
            </div>
          </TabPane>
          <TabPane tab="Timeline" key="2">
            <Timeline>
              {selectedLead?.status_history?.map((item) => {
                return (
                  <Timeline.Item
                    color={item.status === "CREATED" ? "green" : "green"}
                  >
                    {item.status +
                      " by " +
                      item.createdByName +
                      " , " +
                      item.createdByRole +
                      " on " +
                      item.date}
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </TabPane>
        </Tabs>
      </Drawer>
    )

}
export default ShowLeadInfo;