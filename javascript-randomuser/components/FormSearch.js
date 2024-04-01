import { Row, Col, Input, Form, Button } from "antd";

const FormSearch = (props) => {
  const { onSearch } = props
  const [form] = Form.useForm();

  return (
    <Form form={form} name="form_search"
      onFinish={onSearch}
    >
      <Row align={"middle"}>
        <Col sm={4} md={4} lg={4}>
          <label htmlFor="age">อายุ :</label>
          <Form.Item name={'age'}>
            <Input name="age" onChange={(e) => { form.setFieldValue(e.target.name, e.target.value.replace(/[^0-9]/g, '')) }} />
          </Form.Item>
        </Col>
        <Col sm={4} md={4} lg={4}>
          <Button type="primary" htmlType="submit">
            ค้นหา
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default FormSearch