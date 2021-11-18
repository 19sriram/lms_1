import { Form, Row, Col, Input, Select, Button } from "antd"
import form from "antd/lib/form"
import { _leadIndustries, _leadStatus } from "../common/const"

export const AddLeadComponent = (props:any)=>{
    const [form] = Form.useForm();
    const { Option } = Select;
    return (
        <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              initialValues={{ remember: true }}
              onFinish={props.onNewLead}
              autoComplete="off"
              form={form}
            >
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Enter firstname"
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Please input lead firstname!",
                      },
                    ]}
                  >
                    <Input tabIndex={0} />
                  </Form.Item>
                  <Form.Item
                    label="Enter company"
                    name="company"
                    rules={[
                      { required: true, message: "Please input lead company!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Enter phonenumber"
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phonenumber!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Enter website"
                    name="website"
                    rules={[
                      { required: true, message: "Please input your website!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  {/* <Form.Item
                    label="Enter leadsource"
                    name="leadsource"
                    rules={[
                      {
                        required: true,
                        message: "Please input your leadsource!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item> */}
                  <Form.Item
                    label="Enter lead industry"
                    name="leadindustry"
                    rules={[
                      {
                        required: false,
                        message: "Please input lead industry!",
                      },
                    ]}
                  >
                    <Select
                      defaultValue="Real Estate"
                      style={{ width: "100%" }}
                    >
                      {_leadIndustries.map((lead) => (
                        <Option value={lead}>{lead}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Enter notes"
                    name="description"
                    rules={[
                      { required: false, message: "Please input your notes!" },
                    ]}
                  >
                    <Input tabIndex={3} />
                  </Form.Item>
                </Col>

                {/* second col */}
                <Col span={12}>
                  <Form.Item
                    label="Enter lastname"
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Please input lead lastname!",
                      },
                    ]}
                  >
                    <Input tabIndex={1} />
                  </Form.Item>

                  <Form.Item
                    label="Enter title"
                    name="title"
                    rules={[
                      { required: true, message: "Please input lead title!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Enter email"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Please input lead email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Enter address"
                    name="address"
                    rules={[
                      {
                        required: false,
                        message: "Please input your address!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Enter leadstage"
                    name="leadstage"
                    rules={[
                      { required: false, message: "Please input lead stage!" },
                    ]}
                  >
                    <Select defaultValue="Hot" style={{ width: "100%" }}>
                      {_leadStatus.map((lead) => (
                        <Option value={lead}>{lead}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Enter leadowner"
                    name="leadowner"
                    rules={[
                      { required: false, message: "Please input lead owner!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Row>
            </Form>
    )
}