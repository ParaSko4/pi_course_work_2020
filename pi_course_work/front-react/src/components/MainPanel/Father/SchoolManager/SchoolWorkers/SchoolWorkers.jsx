import React from "react";
import {
    Typography,
    Drawer,
    Divider,
    Button,
    Row,
    Col,
    List,
    Avatar,
    Modal,
    Form,
    Radio,
    message,
    DatePicker
} from "antd";
import styles from './SchoolWorkers.module.css';
import {PlusSquareOutlined, UserOutlined} from "@ant-design/icons";
import {requiredMes} from "../../../../../utils/validators/common-validations";
import {Field, reduxForm} from "redux-form";
import {DatePickerField, TextField} from "redux-form-antd";
import {formNames} from "../../../../../resources/const-strings";
import moment from 'moment';
import 'moment/locale/zh-cn';

const {Paragraph, Title} = Typography;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

let required = requiredMes('Require filed')

const makeField = Component => ({input, meta, children, hasFeedback, label, ...rest}) => {
    const hasError = meta.touched && meta.invalid;

    return (
        <Form.Item
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

const NewWorkerForm = (props) => {
    return <Form>
        <Field label="Name:" name="name"
               component={TextField}
               validate={[required]}
               placeholder='Leha'
        />
        <Field label="Surname:" name="surname"
               component={TextField}
               validate={[required]}
               placeholder="Rogach"
        />
        <Field label="Middle Name:" name="middlename"
               component={TextField}
               validate={[required]}
               placeholder="Alexseivich"
        />
        <Field label="Residence:" name="residence"
               component={TextField}
               validate={[required]}
               placeholder="ul. Kosmonavtov"
        />
        <Field label="Number:" name="number"
               component={TextField}
               validate={[required]}
               placeholder="ul. Kosmonavtov"
        />
        <Field label='Birthday:' name="birthday"
               component={DatePickerField}
               validate={[required]}
               placeholder="1999-05-28"
        />
        <Field label="Sex" name="sex" component={RadioGroup} value="f">
            <Radio value="f">Female</Radio>
            <Radio value="m">Male</Radio>
        </Field>
        <Field label="Position:" name="position"
               component={TextField}
               validate={[required]}
               placeholder="Mathematician"
        />
    </Form>
}

const EmptyList = (props) => {
    return <div>
        <List bordered header={
            <Row align={'middle'}>
                <Col span={12}>
                    School Workers
                </Col>
                <Col span={12} align={'end'}>
                    <Button type="primary" shape="circle" icon={<PlusSquareOutlined/>} size='large'
                            onClick={props.showModal}/>
                </Col>
            </Row>
        }/>
    </div>
}

const DescriptionItem = ({title, content, onChangeMethod}) => (
    <Row>
        <Col span={8}>
            <div style={{textAlign: 'right'}}>
                {title} :
            </div>
        </Col>
        <Col span={16}>
            <div style={{textAlign: 'center', margin: '0 0 0 20px'}}>
                <Paragraph editable={{onChange: onChangeMethod}}>{content}</Paragraph>
            </div>
        </Col>
    </Row>
);

const RowDrawer = ({title1, title2, content1, content2, onChangeMethod1, onChangeMethod2}) => (
    <Row>
        <Col span={12}>
            <DescriptionItem title={title1} content={content1} onChangeMethod={onChangeMethod1}/>
        </Col>
        <Col span={12}>
            <DescriptionItem title={title2} content={content2} onChangeMethod={onChangeMethod2}/>
        </Col>
    </Row>
)

class SchoolWorkers extends React.Component {
    state = {
        modalVisible: false,
        drawerVisible: false,
        drawerObject: null
    }

    showDrawer = (id) => {
        let obj = {...this.props.data.find(x => x.workerId === id)}

        this.setState({
            drawerVisible: true,
            drawerObject: obj
        })
    }

    onClose = () => {
        this.setState({
            drawerVisible: false
        })
    }

    showModal = () => {
        this.props.resetForm(formNames.newWorker)

        this.setState({
            modalVisible: true
        })
    }

    handleOk = e => {
        this.props.remoteSubmit(formNames.newWorker)
    }

    handleCancel = e => {
        this.setState({
            modalVisible: false
        })
    }

    formFinishSuccess = e => {
        this.setState({
            modalVisible: false
        })
    }

    modifyName = (newName) => {
        this.setState({
            drawerObject: {...this.state.drawerObject, name: newName}
        })
    }

    modifySurname = (newSurname) => {
        this.setState({
            drawerObject: {...this.state.drawerObject, surname: newSurname}
        })
    }

    modifyMiddleName = (newMiddleName) => {
        this.setState({
            drawerObject: {...this.state.drawerObject, middlename: newMiddleName}
        })
    }

    modifyResidence = (newResidence) => {
        this.setState({
            drawerObject: {...this.state.drawerObject, residence: newResidence}
        })
    }

    modifyNumber = (newNumber) => {
        this.setState({
            drawerObject: {...this.state.drawerObject, number: newNumber}
        })
    }

    modifyPosition = (newPosition) => {
        this.setState({
            drawerObject: {...this.state.drawerObject, position: newPosition}
        })
    }

    modifyLogin = (newLogin) => {
        this.setState({
            drawerObject: {...this.state.drawerObject, login: newLogin}
        })
    }

    modifyPassword = (newPassword) => {
        this.setState({
            drawerObject: {...this.state.drawerObject, password: newPassword}
        })
    }

    modifyBirthday = (newBirthday) => {
        this.setState({
            drawerObject: {...this.state.drawerObject, birthday: newBirthday}
        })
    }

    modifySex = e => {
        this.setState({
            drawerObject: {...this.state.drawerObject, sex: e.target.value}
        })
    };

    submitWorkerChanges = () => {
        this.props.modifiedWorker(this.state.drawerObject)
        message.success('Worker modify!')
    }

    submitWorkerRemoving = () => {
        this.onClose()
        this.props.onRemoveWorker(this.state.drawerObject.personalDataId)
    }

    NewWorkerReduxForm = reduxForm({
        form: formNames.newWorker,
        onSubmit: this.props.onSubmitWorker,
        onSubmitSuccess: this.formFinishSuccess
    })(NewWorkerForm)

    render() {
        if (this.props.schoolWorkersCount === 0) return <EmptyList showModal={this.showModal}/>

        return <div>
            <Row>
                <Col className={styles.schoolWorkers}>
                    <List
                        bordered
                        pagination={{
                            pageSize: 6,
                        }}
                        header={
                            <Row align={'middle'}>
                                <Col span={12}>
                                    School Workers
                                </Col>
                                <Col span={12} align={'end'}>
                                    <Button type="primary" shape="circle" icon={<PlusSquareOutlined/>} size='large'
                                            onClick={this.showModal}/>
                                </Col>
                            </Row>
                        }
                        itemLayout="horizontal"
                        dataSource={this.props.data}
                        renderItem={item => (
                            <List.Item
                                key={item.workerId}
                                actions={[
                                    <a onClick={() => this.showDrawer(item.workerId)}>
                                        View Info
                                    </a>
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
                    <Modal
                        title="Basic Modal"
                        visible={this.state.modalVisible}
                        onOk={this.handleOk}
                        okText={'Submit'}
                        onCancel={this.handleCancel}
                    >
                        <this.NewWorkerReduxForm/>
                    </Modal>
                    {
                        this.state.drawerObject && <Drawer
                            width={640}
                            placement="right"
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.drawerVisible}
                        >
                            <Row align={'middle'}>
                                <Col span={8} offset={-4}>
                                    <Title level={2}>User Profile</Title>
                                </Col>
                                <Col span={2} offset={10}>
                                    <Button danger onClick={this.submitWorkerRemoving}>Remove worker</Button>
                                </Col>
                            </Row>
                            <Divider orientation='left'>Personal</Divider>
                            <RowDrawer title1={"Name"} title2={"Residence"}
                                       content1={this.state.drawerObject.name} content2={this.state.drawerObject.residence}
                                       onChangeMethod1={this.modifyName} onChangeMethod2={this.modifyResidence}
                            />
                            <RowDrawer title1={"Surname"} title2={"Number"}
                                       content1={this.state.drawerObject.surname} content2={this.state.drawerObject.number}
                                       onChangeMethod1={this.modifySurname} onChangeMethod2={this.modifyNumber}
                            />
                            <RowDrawer title1={"Middle name"} title2={"Position"}
                                       content1={this.state.drawerObject.middlename} content2={this.state.drawerObject.position}
                                       onChangeMethod1={this.modifyMiddleName} onChangeMethod2={this.modifyPosition}
                            />
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
                                                <DatePicker onChange={this.modifyBirthday} defaultValue={moment(this.state.drawerObject.birthday, 'YYYY-MM-DD')} />
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
                                                <Radio.Group onChange={this.modifySex} value={this.state.drawerObject.sex}>
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
                                       content1={this.state.drawerObject.login} content2={this.state.drawerObject.password}
                                       onChangeMethod1={this.modifyLogin} onChangeMethod2={this.modifyPassword}
                            />
                            <br/>
                            <br/>
                            <Row>
                                <Col span={24}>
                                    <Button onClick={this.submitWorkerChanges}>Submit Change</Button>
                                </Col>
                            </Row>
                            <Divider/>
                        </Drawer>
                    }
                </Col>
            </Row>
        </div>
    }
}

export default SchoolWorkers