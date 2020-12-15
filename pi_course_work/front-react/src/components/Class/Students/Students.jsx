import React, {useState} from "react";
import {formNames} from "../../../resources/const-strings";
import {Field, reduxForm} from "redux-form";
import {requiredMes} from "../../../utils/validators/common-validations";
import {
    Avatar,
    Button,
    Col,
    DatePicker,
    Divider,
    Drawer,
    Form,
    List,
    Modal,
    Pagination,
    Radio,
    Row,
    Typography
} from "antd";
import {DatePickerField, TextField} from "redux-form-antd";
import {UserOutlined} from "@ant-design/icons";
import {schoolClass} from "../../../resources/pages-setting";
import moment from "moment";
import {DescriptionItem, RowDrawer} from "../../commons/DrawerElements";

const {Paragraph, Title} = Typography;

let required = requiredMes('Require filed')

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 15},
};

const makeField = Component => ({input, meta, children, hasFeedback, label, ...rest}) => {
    const hasError = meta.touched && meta.invalid;

    return (
        <Form.Item
            {...formItemLayout}
            label={label}
            validateStatus={hasError ? "error" : "success"}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component {...input} {...rest} children={children}/>
        </Form.Item>
    )
}
const RadioGroup = makeField(Radio.Group);

const NewStudentForm = (props) => {
    return <Form>
        <Field label="Name:" name="name" {...formItemLayout}
               component={TextField}
               validate={[required]}
               placeholder='Leha'
        />
        <Field label="Surname:" name="surname" {...formItemLayout}
               component={TextField}
               validate={[required]}
               placeholder="Rogach"
        />
        <Field label="Middle Name:" name="middlename" {...formItemLayout}
               component={TextField}
               validate={[required]}
               placeholder="Alexseivich"
        />
        <Field label="Residence:" name="residence" {...formItemLayout}
               component={TextField}
               validate={[required]}
               placeholder="ul. Kosmonavtov"
        />
        <Field label="Number:" name="number" {...formItemLayout}
               component={TextField}
               validate={[required]}
               placeholder="+375(33)-236-33-58"
        />
        <Field label='Birthday:' name="birthday" {...formItemLayout}
               component={DatePickerField}
               validate={[required]}
               placeholder="1999-05-28"
        />
        <Field label="Sex" name="sex" component={RadioGroup} value="f">
            <Radio value="f">Female</Radio>
            <Radio value="m">Male</Radio>
        </Field>
    </Form>
}

const Students = (props) => {
    let [studentModalVisible, setStudentModalVisible] = useState(false)
    let [studentDrawerVisible, setStudentDrawerVisible] = useState(false)
    let [drawerStudent, setDrawerStudent] = useState(0)

    const UpdateDrawerStudent = ({type, value}) => {
        switch (type) {
            case 'Name':
                return setDrawerStudent({...drawerStudent, name: value})
            case 'Surname':
                return setDrawerStudent({...drawerStudent, surname: value})
            case 'Residence':
                return setDrawerStudent({...drawerStudent, residence: value})
            case 'Number':
                return setDrawerStudent({...drawerStudent, number: value})
            case 'Middle name':
                return setDrawerStudent({...drawerStudent, middlename: value})
            case 'Birthday':
                return setDrawerStudent({...drawerStudent, birthday: value})
            case 'Sex':
                return setDrawerStudent({...drawerStudent, sex: value})
            case 'Login':
                return setDrawerStudent({...drawerStudent, login: value})
            case 'Password':
                return setDrawerStudent({...drawerStudent, password: value})
        }
    }

    const handleStudentOk = e => {
        props.remoteSubmit(formNames.addStudent)
    }
    const submitStudentForm = (values) => {
        props.onSubmitStudent({
            ...values,
            classId: props.schoolClass.id
        })
    }
    const submitStudentChanges = () => {
        props.onStudentChangesSubmit(
            {
                personalDataId: drawerStudent.personalDataId,
                name: drawerStudent.name,
                surname: drawerStudent.surname,
                middlename: drawerStudent.middlename,
                birthday: drawerStudent.birthday,
                residence: drawerStudent.residence,
                number: drawerStudent.number,
                sex: drawerStudent.sex,
                login: drawerStudent.login,
                password: drawerStudent.password
            })
    }

    let NewStudentReduxForm = reduxForm({
        form: formNames.addStudent,
        onSubmit: submitStudentForm,
        onSubmitSuccess: () => setStudentModalVisible(false)
    })(NewStudentForm)

    return <div>
        <Divider plain={true}>Students</Divider>
        <List
            style={{height: '70vh'}}
            itemLayout="horizontal"
            dataSource={props.students}
            renderItem={item => (
                <List.Item
                    key={item.workerId}
                    actions={[
                        <a onClick={() => {
                            setDrawerStudent(item)
                            setStudentDrawerVisible(true)
                        }}>View Info</a>
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar size={'large'} icon={<UserOutlined/>}/>
                        }
                        title={item.fullName}
                        description={item.position}
                    />
                </List.Item>
            )}
        />
        <Row>
            <Col span={12}>
                <Pagination
                    style={{float: 'left'}}
                    defaultCurrent={1}
                    total={props.studentsCount}
                    pageSize={schoolClass.studentsPageSize}
                    hideOnSinglePage
                />
            </Col>
            <Col span={12}>
                <Button style={{float: 'right'}} onClick={() => setStudentModalVisible(true)}>Add student</Button>
            </Col>
        </Row>
        <Modal
            title="Student creation modal"
            visible={studentModalVisible}
            onOk={handleStudentOk}
            okText={'Submit'}
            onCancel={() => setStudentModalVisible(false)}
        >
            <NewStudentReduxForm classes={props.classes}/>
        </Modal>
        {
            drawerStudent && <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={() => setStudentDrawerVisible(false)}
                visible={studentDrawerVisible}
            >
                <Row align={'middle'}>
                    <Col span={12}>
                        <Title style={{float: 'left'}} level={2}>Student Profile</Title>
                    </Col>
                    <Col span={12}>
                        <Button style={{float: 'right'}}
                                danger
                                onClick={() => {
                                    setStudentDrawerVisible(false)
                                    props.onSubmitStudentRemoving(drawerStudent.personalDataId)
                                }}
                        >
                            Remove student
                        </Button>
                    </Col>
                </Row>
                <Divider orientation='left'>Personal</Divider>
                <RowDrawer title1={"Name"} title2={"Residence"}
                           content1={drawerStudent.name}
                           content2={drawerStudent.residence}
                           onChangeMethod={UpdateDrawerStudent}
                />
                <RowDrawer title1={"Surname"} title2={"Number"}
                           content1={drawerStudent.surname}
                           content2={drawerStudent.number}
                           onChangeMethod={UpdateDrawerStudent}
                />
                <Row>
                    <Col span={12}>
                        <DescriptionItem title={"Middle name"}
                                         content={drawerStudent.middlename}
                                         onChangeMethod={UpdateDrawerStudent}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={8}>
                                <div style={{textAlign: 'right'}}>
                                    Birthday :
                                </div>
                            </Col>
                            <Col span={16}>
                                <div style={{textAlign: 'center'}}>
                                    <DatePicker
                                        onChange={(value, string) => UpdateDrawerStudent({
                                            type: 'Birthday',
                                            value: string
                                        })}
                                        value={moment(drawerStudent.birthday, 'YYYY-MM-DD')}/>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={8}>
                                <div style={{textAlign: 'right'}}>
                                    Sex :
                                </div>
                            </Col>
                            <Col span={16}>
                                <div style={{textAlign: 'center'}}>
                                    <Radio.Group value={drawerStudent.sex} o
                                                 onChange={e => UpdateDrawerStudent({
                                                     type: 'Sex',
                                                     value: e.target.value
                                                 })}>
                                        <Radio value={'f'}>female</Radio>
                                        <Radio value={'m'}>male</Radio>
                                    </Radio.Group>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider orientation='left'>Account</Divider>
                <RowDrawer title1={"Login"} title2={"Password"}
                           content1={drawerStudent.login}
                           content2={drawerStudent.password}
                           onChangeMethod={UpdateDrawerStudent}
                />
                <br/>
                <br/>
                <Row>
                    <Col span={24}>
                        <Button onClick={submitStudentChanges}>Submit Change</Button>
                    </Col>
                </Row>
                <Divider/>
            </Drawer> || ''
        }
    </div>
}

export default Students