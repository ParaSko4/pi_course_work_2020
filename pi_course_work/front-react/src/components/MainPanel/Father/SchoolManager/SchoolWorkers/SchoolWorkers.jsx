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
    DatePicker, Pagination
} from "antd";
import {requiredMes} from "../../../../../utils/validators/common-validations";
import {Field, reduxForm} from "redux-form";
import {DatePickerField, TextField} from "redux-form-antd";
import {formNames} from "../../../../../resources/const-strings";
import moment from 'moment';
import 'moment/locale/zh-cn';
import {manager, schoolClass} from "../../../../../resources/pages-setting";
import {UserOutlined} from "@ant-design/icons";
import {RowDrawer} from "../../../../commons/DrawerElements";

const {Paragraph, Title} = Typography;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 15},
};

let required = requiredMes('Require filed')

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

const NewWorkerForm = (props) => {
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
        <Field label="Position:" name="position" {...formItemLayout}
               component={TextField}
               validate={[required]}
               placeholder="Mathematician"
        />
    </Form>
}

class SchoolWorkers extends React.Component {
    state = {
        modalVisible: false,
        drawerVisible: false,
        drawerObject: null,
        currWorkerPage: 1
    }

    showDrawer = (worker) => {
        this.setState({
            drawerVisible: true,
            drawerObject: {...worker}
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

    UpdateDrawerWorker = ({type, value}) => {
        switch (type){
            case 'Name':
                return this.setState({drawerObject: {...this.state.drawerObject, name: value}})
            case 'Surname':
                return this.setState({drawerObject: {...this.state.drawerObject, surname: value}})
            case 'Residence':
                return this.setState({drawerObject: {...this.state.drawerObject, residence: value}})
            case 'Number':
                return this.setState({drawerObject: {...this.state.drawerObject, number: value}})
            case 'Middle name':
                return this.setState({drawerObject: {...this.state.drawerObject, middlename: value}})
            case 'Birthday':
                return this.setState({drawerObject: {...this.state.drawerObject, birthday: value}})
            case 'Sex':
                return this.setState({drawerObject: {...this.state.drawerObject, sex: value}})
            case 'Position':
                return this.setState({drawerObject: {...this.state.drawerObject, position: value}})
            case 'Login':
                return this.setState({drawerObject: {...this.state.drawerObject, login: value}})
            case 'Password':
                return this.setState({drawerObject: {...this.state.drawerObject, password: value}})
        }
    }

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

    pageChanges = page => {
        this.setState({
            currWorkerPage: page
        })
    }

    render() {
        return <div>
            <Divider plain={true}>Workers</Divider>
            <List
                style={{height: '70vh'}}
                itemLayout="horizontal"
                dataSource={this.props.data.filter(
                    (worker, index, arr) =>
                        index < this.state.currWorkerPage * manager.workersPageSize &&
                        index > this.state.currWorkerPage * manager.workersPageSize - manager.workersPageSize - 1 ? worker : false
                )}
                renderItem={item => (
                    <List.Item
                        key={item.workerId}
                        actions={[<a onClick={() => this.showDrawer(item)}>View Info</a>]}
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
                        total={this.props.schoolWorkersCount}
                        pageSize={manager.workersPageSize}
                        onChange={this.pageChanges}
                        hideOnSinglePage
                    />
                </Col>
                <Col span={12}>
                    <Button style={{float: 'right'}} onClick={this.showModal}>Add worker</Button>
                </Col>
            </Row>


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
                        <Col span={12}>
                            <Title style={{float: 'left'}} level={2}>User Profile</Title>
                        </Col>
                        <Col span={12}>
                            <Button style={{float: 'right'}} danger onClick={this.submitWorkerRemoving}>Remove
                                worker</Button>
                        </Col>
                    </Row>
                    <Divider orientation='left'>Personal</Divider>
                    <RowDrawer title1={"Name"} title2={"Residence"}
                               content1={this.state.drawerObject.name}
                               content2={this.state.drawerObject.residence}
                               onChangeMethod={this.UpdateDrawerWorker}
                    />
                    <RowDrawer title1={"Surname"} title2={"Number"}
                               content1={this.state.drawerObject.surname}
                               content2={this.state.drawerObject.number}
                               onChangeMethod={this.UpdateDrawerWorker}
                    />
                    <RowDrawer title1={"Middle name"} title2={"Position"}
                               content1={this.state.drawerObject.middlename}
                               content2={this.state.drawerObject.position}
                               onChangeMethod={this.UpdateDrawerWorker}
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
                                        <DatePicker
                                            onChange={
                                                (momentValue, dataString) => this.UpdateDrawerWorker({type: 'Birthday', value: dataString})
                                            }
                                            value={moment(this.state.drawerObject.birthday, 'YYYY-MM-DD')}/>
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
                                        <Radio.Group value={this.state.drawerObject.sex}
                                                     onChange={e => this.UpdateDrawerWorker({type: 'Sex', value: e.target.value})}
                                        >
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
                               content1={this.state.drawerObject.login}
                               content2={this.state.drawerObject.password}
                               onChangeMethod={this.UpdateDrawerWorker}
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
        </div>
    }
}

export default SchoolWorkers