import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    Col,
    Divider,
    Empty,
    Form,
    message,
    Modal,
    Pagination, Popover,
    Row,
    Select
} from 'antd';
import {manager, schoolClass} from "../../../../../resources/pages-setting";
import {formNames} from "../../../../../resources/const-strings";
import {Field, reduxForm} from "redux-form";
import {DatePickerField, SelectField, TextField} from "redux-form-antd";
import {requiredMes} from "../../../../../utils/validators/common-validations";
import {NavLink, Redirect} from 'react-router-dom';

let globalCoolTeacher = null
let required = requiredMes('Require filed')

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 15},
};

const Grid = (props) => {
    let colClasses = []
    let Rows = []

    props.classes.forEach((schoolClass, index, arr) => {
        colClasses.push(<Col key={schoolClass.id} span={8}>
                <NavLink to={'/Class/'+schoolClass.id}>
                    <Card key={schoolClass.letter + schoolClass.number + schoolClass.id}
                          title={'Class ' + schoolClass.number + schoolClass.letter}
                          bordered={true}
                          hoverable
                    >
                        <Row>
                            <Col span={8} style={{textAlign: 'right'}}>
                                Teacher:
                            </Col>
                            <Col span={16} style={{textAlign: 'center'}}>
                                {

                                    props.workers !== null ? (props.workers.find((worker) => {
                                        return worker.personalDataId === schoolClass.idteacher ? worker : false
                                    }) ? props.workers.find((worker) => {
                                        return worker.personalDataId === schoolClass.idteacher ? worker : false
                                    }).fullName : null) : null
                                }
                            </Col>
                        </Row>
                    </Card>
                </NavLink>
            </Col>
        )
        if ((index + 1) % manager.classesColSize === 0) {
            Rows.push(<Row key={'classes' + schoolClass.id} gutter={[20, 24]}>
                    {colClasses}
                </Row>
            )

            colClasses = []
        }
        if (props.classes.length === (index + 1) && (index + 1) % manager.classesColSize !== 0) {
            Rows.push(<Row key={'small classes'} gutter={[20, 24]}>
                    {colClasses}
                </Row>
            )
        }
    })

    return <div style={{height: '50vh'}}>
        {Rows}
    </div>;
}

const NewClassForm = (props) => {
    let options = props.workers.map(worker => {
        return {
            label: worker.fullName,
            value: worker.fullName
        }
    })

    useEffect(() => {
        options = props.workers.map(worker => {
            return {
                label: worker.fullName,
                value: worker.fullName
            }
        })
    }, [props.workers])

    globalCoolTeacher = props.workers ? props.workers[0].fullName : null

    const changeValue = (value) => {
        globalCoolTeacher = value
    }

    return <Form>
        <Field label="Number:" name="number" {...formItemLayout}
               component={TextField}
               validate={[required]}
               placeholder="919"
        />
        <Field label="Letter:" name="letter" {...formItemLayout}
               component={TextField}
               validate={[required]}
               placeholder="Я"
        />

        <div style={{margin: '0 0 0 9px'}}>
            <label>Cool teacher:</label>
            <Select style={{margin: '0 0 0 10px'}} options={options} onChange={changeValue} value={globalCoolTeacher}/>
        </div>
    </Form>
}

const Classes = (props) => {
    let [classModalVisible, setClassModalVisible] = useState(false)
    let [currPage, setCurrPage] = useState(1)

    useEffect(() => {

    }, [props.workersWithoutClass, props.workers, props.classes, props.classesCount])

    const setModalVisibleCheck = () => {
        if (props.workersWithoutClass.length !== 0) {
            setClassModalVisible(!classModalVisible)
        } else {
            message.error({content: 'All teacher has class!', duration: 2})
        }
    }

    const handleClassOk = e => {
        props.remoteSubmit(formNames.addClass)
    }
    const submitClassForm = (values) => {
        let valueForApi = {
            letter: values.letter,
            number: parseInt(values.number, 10),
            idteacher: props.workersWithoutClass.find((worker) => {
                return worker.fullName === globalCoolTeacher ? worker : false
            }).personalDataId
        }

        props.onSubmitClass(valueForApi)
    }

    let NewClassReduxForm = reduxForm({
        form: formNames.addClass,
        onSubmit: submitClassForm,
        onSubmitSuccess: () => setClassModalVisible(false)
    })(NewClassForm)

    return <div className="site-card-wrapper">
        <Divider plain={true}>Classes</Divider>
        <div style={{height: '71.7vh'}}>
            {props.classes ? <Grid classes={props.classes.filter(
                (schoolClass, index, arr) =>
                    index < currPage * manager.classesPageSize &&
                    index > currPage * manager.classesPageSize - manager.classesPageSize - 1 ? schoolClass : false
            )} workers={props.workers}/> : <Empty/>}
        </div>
        <Row>
            <Col span={12}>
                <Pagination
                    style={{float: 'left'}}
                    defaultCurrent={1}
                    total={props.classesCount}
                    pageSize={manager.classesPageSize}
                    onChange={page => setCurrPage(page)}
                    hideOnSinglePage
                />
            </Col>
            <Col span={12}>
                <Button style={{float: 'right'}} onClick={setModalVisibleCheck}>Add class</Button>
            </Col>
        </Row>
        <Modal
            title="Class creation modal"
            visible={classModalVisible}
            onOk={handleClassOk}
            okText={'Submit'}
            onCancel={setModalVisibleCheck}
        >
            { props.workersWithoutClass.length !== 0 ? <NewClassReduxForm workers={props.workersWithoutClass}/> : null }
        </Modal>
    </div>
}

export default Classes