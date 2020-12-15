import React, {useEffect, useState} from "react";
import {
    Avatar,
    Button,
    Card,
    Col,
    Divider, Drawer,
    Empty,
    Form, message,
    Modal,
    Radio,
    Row,
    Select, Space,
    Table,
    Tabs,
    Typography
} from "antd";
import {EditFilled, EditOutlined, MinusOutlined} from "@ant-design/icons";
import {Field} from "redux-form";
import {DatePickerField, TextField} from "redux-form-antd";
import {requiredMes} from "../../../utils/validators/common-validations";
import {RowDrawer, SoloRowDrawer, TwoRowDrawer} from "../../commons/DrawerElements";
import {NavLink} from "react-router-dom";
import {navBarPath} from "../../../resources/const-strings";
import {schoolClass} from "../../../resources/pages-setting";

const {Title} = Typography;
const {TabPane} = Tabs;
const {Option, OptGroup} = Select;

const days = [
    { key: 1, tab: 'Monday'},
    { key: 2, tab: 'Tuesday'},
    { key: 3, tab: 'Wednesday'},
    { key: 4, tab: 'Thursday'},
    { key: 5, tab: 'Friday'},
    { key: 6, tab: 'Saturday'},
]

const ClassComponent = (props) => {
    let [drawerObject, setDrawerObject] = useState({...props.schoolClass, number: props.schoolClass.number.toString()})
    let [drawerVisible, setDrawerVisible] = useState(false)
    let [workersVisible, setWorkersVisible] = useState(false)
    let [currWorker, setCurrWorker] = useState(props.worker.fullName)

    const UpdateDrawer = ({type, value}) => {
        switch (type) {
            case 'Number':
                return setDrawerObject({...drawerObject, number: value})
            case 'Letter':
                return setDrawerObject({...drawerObject, letter: value})
            case 'Cool teacher':
                return setDrawerObject({...drawerObject, idteacher: value})
        }
    }

    const SubmitChanges = () => {
        props.onSubmitClassChanges({...drawerObject, number: parseInt(drawerObject.number)})
    }

    const SubmitRemoving = () => {
        props.onSubmitClassRemoving()
    }

    const CoolTeacherChange = (value) => {
        setCurrWorker(props.workers.filter(worker => worker.personalDataId === value ? worker : false)[0].fullName)
        UpdateDrawer({type: 'Cool teacher', value})
    }

    const options = props.workers.map(worker => {
        return {
            label: worker.fullName,
            value: worker.personalDataId
        }
    })

    return <Row gutter={[12, 12]}>
        <Col span={12}>
            <Card style={{width: 300, height: '100%'}}
                  hoverable
                  title={
                      <Title level={4}>
                          Class {props.schoolClass.number + props.schoolClass.letter}
                      </Title>
                  }
                  onClick={() => {
                      setDrawerObject({...props.schoolClass, number: props.schoolClass.number.toString()})
                      setDrawerVisible(true)
                  }}
            >
                <Space direction={"vertical"}>
                    <div>
                        Size : {props.studentsCount}
                    </div>
                    <div>
                        Cool teacher : {props.worker.fullName}
                    </div>
                </Space>
            </Card>
        </Col>
        <Drawer
            width={620}
            placement="right"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
        >
            <Title style={{float: 'left'}} level={2}>Class editor</Title>
            <Divider/>
            <RowDrawer title1={"Number"} title2={"Letter"}
                       content1={drawerObject.number}
                       content2={drawerObject.letter}
                       onChangeMethod={UpdateDrawer}
            />
            <Row>
                <Col span={4}>
                    <div style={{textAlign: 'right'}}>
                        Cool teacher :
                    </div>
                </Col>
                <Col span={16}>
                    <div style={{textAlign: 'center', margin: '0 0 5% 0'}}>
                        {
                            workersVisible ? <div>
                                <Select showSearch
                                        options={options}
                                        onChange={CoolTeacherChange}
                                        style={{minWidth: '12vw'}}
                                />
                                <Button size={'small'} type="link" icon={<EditFilled/>}
                                        onClick={() => setWorkersVisible(false)}/>
                            </div> : <div>
                                {currWorker}
                                <Button size={'small'} type="link" icon={<EditOutlined/>}
                                        onClick={() => setWorkersVisible(true)}/>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Button onClick={SubmitChanges}>Submit Change</Button>
                </Col>
                <Col span={12}>
                    <NavLink to={navBarPath.SchoolManager}>
                        <Button style={{float: 'right'}}
                                danger
                                onClick={() => {
                                    SubmitRemoving()
                                    setDrawerVisible(false)
                                }}>
                            Remove class
                        </Button>
                    </NavLink>
                </Col>
            </Row>
            <Divider/>
        </Drawer>
    </Row>
}

let timeValue = null
let auditoriumValue = null
let lessonValue = null
let teacherValue = null

const ScheduleComponent = (props) => {
    const ScheduleDayColumns = [
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Auditorium number',
            dataIndex: 'auditoriumNumber',
            key: 'auditoriumNumber',
        },
        {
            title: 'Auditorium name',
            dataIndex: 'auditoriumName',
            key: 'auditoriumName',
        },
        {
            title: 'Lesson',
            dataIndex: 'lesson',
            key: 'lesson',
        },
        {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
        },
    ]

    let defaultPoint = {
        id: 0,
        idtime: null,
        idauditorium: null,
        idlesson: null,
        idteacher: null,
        idclass: props.classId,
    }

    const ScheduleCompareFunc = (a, b) => {
        if (a.time > b.time) {
            return 1;
        } else if (a.time < b.time) {
            return -1;
        }

        return 0;
    }

    const setGlobalValueNull = () => {
        timeValue = null
        auditoriumValue = null
        lessonValue = null
        teacherValue = null
    }

    const GetCurrScheduleDay = day => {
        let scheduleDay = props.classSchedule ? props.classSchedule
            .filter(schedule => day.key && schedule.day === day.key || day && schedule.day === day ? schedule : false) : []
        return scheduleDay
    }
    const GetScheduleForTable = day => {
        let scheduleDay = GetCurrScheduleDay(day)
        return scheduleDay ?
            scheduleDay.map(schedule => {
                    let auditorium = props.auditoriums.filter(auditorium => auditorium.id === schedule.idauditorium ? auditorium : false)[0]
                    return {
                        id: schedule.id,
                        time: props.times.filter(time => time.id === schedule.idtime ? time : false)[0].period,
                        auditoriumNumber: auditorium.number,
                        auditoriumName: auditorium.name,
                        lesson: props.lessons.filter(lesson => lesson.id === schedule.idlesson ? lesson : false)[0].name,
                        teacher: props.workers.filter(worker => worker.workerId === schedule.idteacher ? worker : false)[0].fullName
                    }
                }).sort(ScheduleCompareFunc) : []
    }

    let [editScheduleMode, setEditScheduleMode] = useState(false)
    let [scheduleModalVisible, setScheduleModalVisible] = useState(false)

    let [day, setDay] = useState(days[0].key)

    let [scheduleModalDataForTable, setScheduleModalDataForTable] = useState(GetScheduleForTable(days[0]))
    let [point, setPoint] = useState(defaultPoint)

    let [dataToSave, setDataToSave] = useState([])
    let [scheduleDataForTable, setScheduleDataForTable] = useState(GetScheduleForTable(days[0].key))
    let [currScheduleDay, setCurrScheduleDay] = useState(GetCurrScheduleDay(days[0].key))

    useEffect(() => {
        setScheduleDataForTable(GetScheduleForTable(day))
        setCurrScheduleDay(GetCurrScheduleDay(day))
    }, [props.classSchedule])

    const GetDayHalf = currData => {
        return props.times ? props.times.filter(time => {
            if (time.dayhalf === "d") {
                if (currData) {
                    if (!currData.find(t => t.idtime === time.id)) {
                        return time
                    } else {
                        return false
                    }
                } else {
                    return time
                }
            }
            return false
        }) : []
    }
    const GetEveningHalf = currData => {
        return props.times ? props.times.filter(time => {
            if (time.dayhalf === "e") {
                if (currData) {
                    if (!currData.find(t => t.idtime === time.id)) {
                        return time
                    } else {
                        return false
                    }
                } else {
                    return time
                }
            }
            return false
        }) : []
    }

    let [dayTimes, setDayTimes] = useState([])
    let [eveningTimes, setEveningTimes] = useState([])

    const setHalfTimes = currData => {
        setDayTimes(currData ? GetDayHalf(currData) : GetDayHalf())
        setEveningTimes(currData ? GetEveningHalf(currData) : GetEveningHalf())
    }

    const RemoveFromDataToSave = (del, record) => {
        let updateDataToSave = [...dataToSave.filter(el => el.id === del.id ? false : el)]
        setDataToSave([...updateDataToSave])
        setHalfTimes(updateDataToSave)

        setScheduleModalDataForTable([...scheduleModalDataForTable.filter(
            schedule => JSON.stringify(schedule) === JSON.stringify(record) ? false : schedule
        ).sort(ScheduleCompareFunc)])
    }

    const CreationScheduleDayColumns = [
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Auditorium number',
            dataIndex: 'auditoriumNumber',
            key: 'auditoriumNumber',
        },
        {
            title: 'Auditorium name',
            dataIndex: 'auditoriumName',
            key: 'auditoriumName',
        },
        {
            title: 'Lesson',
            dataIndex: 'lesson',
            key: 'lesson',
        },
        {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space key={'record' + record.time} size="middle">
                    <Button key={'edit_record' + record.time} type={"text"} onClick={() => {
                        let del = dataToSave.find(el => props.times.find(t => t.id === el.idtime).period === record.time)
                        let obj = {...del}

                        RemoveFromDataToSave(del, record)

                        timeValue = obj.idtime
                        auditoriumValue = obj.idauditorium
                        lessonValue = obj.idlesson
                        teacherValue = obj.idteacher
                        setPoint(obj)

                    }}>Edit</Button>

                    <Button key={'delete_record' + record.time} danger onClick={() => {
                        let del = dataToSave.find(el => props.times.find(t => t.id === el.idtime).period === record.time)

                        RemoveFromDataToSave(del, record)

                        setPoint(defaultPoint)
                        setGlobalValueNull()
                    }}>Delete</Button>
                </Space>
            ),
        },
    ]

    const SubmitPoint = () => {
        if (!point.idtime) {
            message.error({content: 'Choice time!', duration: 2})
        } else if (!point.idauditorium) {
            message.error({content: 'Choice auditorium!', duration: 2})
        } else if (!point.idlesson) {
            message.error({content: 'Choice lesson!', duration: 2})
        } else if (!point.idteacher) {
            message.error({content: 'Choice teacher!', duration: 2})
        } else {
            let updateDataToSave = [...dataToSave, {...point, day: day}]
            setDataToSave([...updateDataToSave])
            setHalfTimes(updateDataToSave)

            let auditoriumToTable = props.auditoriums.filter(auditorium => auditorium.id === point.idauditorium ? auditorium : false)[0]
            setScheduleModalDataForTable([...scheduleModalDataForTable, {
                id: point.id,
                time: props.times.filter(time => time.id === point.idtime ? time : false)[0].period,
                auditoriumNumber: auditoriumToTable.number,
                auditoriumName: auditoriumToTable.name,
                lesson: props.lessons.filter(lesson => lesson.id === point.idlesson ? lesson : false)[0].name,
                teacher: props.workers.filter(worker => worker.workerId === point.idteacher ? worker : false)[0].fullName
            }].sort(ScheduleCompareFunc))

            setPoint(defaultPoint)
            setGlobalValueNull()
        }
    }

    const ScheduleDayForm = (props) => {
        const ChoiceTime = (value) => {
            timeValue = value
            setPoint({...point, idtime: value})
        }

        const ChoiceAuditorium = (value) => {
            auditoriumValue = value
            setPoint({...point, idauditorium: value})
        }

        const ChoiceLesson = (value) => {
            lessonValue = value
            setPoint({...point, idlesson: value})
        }

        const ChoiceTeacher = (value) => {
            teacherValue = value
            setPoint({...point, idteacher: value})
        }

        return <div>
            <Row gutter={[12, 12]}>
                <Col span={6} align={'middle'}>Time</Col>
                <Col span={6} align={'middle'}>Auditorium</Col>
                <Col span={6} align={'middle'}>Lesson</Col>
                <Col span={6} align={'middle'}>Teacher</Col>
            </Row>
            <Row gutter={[12, 6]}>
                <Col span={6} align={'middle'}>
                    <Select showSearch style={{minWidth: '15vw'}}
                            onChange={ChoiceTime}
                            value={timeValue}
                            optionFilterProp="children"
                            filterOption={
                                (input, option) => {
                                    if (option.value) {
                                        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    } else {
                                        return false;
                                    }
                                }
                            }
                    >
                        {
                            dayTimes.length !== 0 ? <OptGroup label="Day shift">
                                {dayTimes.map(time => {
                                    return <Option key={'dtime' + time.id} value={time.id}>
                                        {time.period}
                                    </Option>
                                })}
                            </OptGroup> : null
                        }
                        {
                            eveningTimes.length !== 0 ? <OptGroup label="Evening shift">
                                {eveningTimes.map(time => {
                                    return <Option key={'etime' + time.id} value={time.id}>
                                        {time.period}
                                    </Option>
                                })}
                            </OptGroup> : null
                        }
                    </Select>
                </Col>
                <Col span={6} align={'middle'}>
                    <Select showSearch style={{minWidth: '15vw'}}
                            onChange={ChoiceAuditorium} defaultValue={defaultPoint.idauditorium}
                            options={[...props.auditoriums.map(auditorium => {
                                return {
                                    label: auditorium.number,
                                    value: auditorium.id,
                                }
                            })]}
                            filterOption={
                                (input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={auditoriumValue}
                    />
                </Col>
                <Col span={6} align={'middle'}>
                    <Select showSearch style={{minWidth: '15vw'}}
                            onChange={ChoiceLesson} defaultValue={defaultPoint.idlesson}
                            options={[...props.lessons.map(lesson => {
                                return {
                                    label: lesson.name,
                                    value: lesson.id,
                                }
                            })]}
                            filterOption={
                                (input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={lessonValue}
                    />
                </Col>
                <Col span={6} align={'middle'}>
                    <Select showSearch style={{minWidth: '15vw'}}
                            onChange={ChoiceTeacher} defaultValue={defaultPoint.idteacher}
                            options={[...props.workers.map(lesson => {
                                return {
                                    label: lesson.fullName,
                                    value: lesson.workerId,
                                }
                            })]}
                            filterOption={
                                (input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={teacherValue}
                    />
                </Col>
            </Row>
        </div>
    }

    const PrepareVariables = () => {
        setPoint(defaultPoint)
        setGlobalValueNull()

        setHalfTimes(currScheduleDay)
        setScheduleModalVisible(true)
    }

    const ShowModalEdit = () => {
        setScheduleModalDataForTable(scheduleDataForTable)
        setDataToSave(currScheduleDay)

        setEditScheduleMode(true)
        PrepareVariables()
    }

    const ShowModalAdd = () => {
        setDataToSave([])
        setScheduleModalDataForTable([])
        PrepareVariables()
    }

    const CloseScheduleModal = () => {
        setScheduleModalVisible(false)
        setEditScheduleMode(false)

        TabsChanges(day)
    }

    const SubmitRemoving = () => {
        props.onSubmitRemovingScheduleDay(day);
    }

    const TabsChanges = (key) => {
        setDay(parseInt(key))

        let scheduleDay = GetCurrScheduleDay(parseInt(key))
        setCurrScheduleDay(scheduleDay)
        setHalfTimes(scheduleDay)

        let scheduleForTable = GetScheduleForTable(parseInt(key))
        setScheduleDataForTable(scheduleForTable)

        setEditScheduleMode(scheduleForTable && scheduleForTable.length !== 0)
    }

    const handleScheduleSubmit = e => {
        props.onSubmitScheduleDay(dataToSave);
        CloseScheduleModal()
    }

    const handleScheduleSubmitChanges = e => {
        if (dataToSave.length === 0) {
            props.onSubmitRemovingScheduleDay(day);
        } else {
            props.onSubmitScheduleDayChanges(dataToSave);
        }

        CloseScheduleModal()
    }

    return <div>
        <Row>
            <Col span={24}>
                <Tabs onChange={TabsChanges} style={{minHeight: '50vh'}}>
                    {days.map(day => <TabPane tab={day.tab} key={day.key}>
                            {
                                scheduleDataForTable.length === 0 ? <Empty/> :
                                    <Table dataSource={scheduleDataForTable} columns={ScheduleDayColumns}
                                           pagination={{pageSize: schoolClass.scheduleCreationPageSize, hideOnSinglePage: true}}/>
                            }
                        </TabPane>
                    )}
                </Tabs>
            </Col>
        </Row>
        <Row gutter={20}>
            <Col>
                {
                    scheduleDataForTable.length === 0 ? <Button onClick={ShowModalAdd}>
                        Add day
                    </Button> : <Button onClick={ShowModalEdit}>
                        Edit day
                    </Button>
                }
            </Col>
            <Col>
                <Button danger onClick={SubmitRemoving}>Remove day</Button>
            </Col>
        </Row>

        <Modal
            title={editScheduleMode ? "Schedule edit modal" : "Schedule creation modal"}
            visible={scheduleModalVisible}
            width={'80vw'}
            onOk={editScheduleMode ? handleScheduleSubmitChanges : handleScheduleSubmit}
            okText={editScheduleMode ? 'Submit changes' : 'Submit'}
            onCancel={CloseScheduleModal}
        >
            <Table style={{minHeight: '15vh'}} columns={CreationScheduleDayColumns}
                   dataSource={scheduleModalDataForTable ? scheduleModalDataForTable : null}
                   size={'small'} pagination={{pageSize: schoolClass.scheduleCreationPageSize, hideOnSinglePage: true}}/>
            <Row>
                <Col span={22}>
                    <ScheduleDayForm workers={props.workers} lessons={props.lessons}
                                     auditoriums={props.auditoriums} allSchedules={props.allSchedules}/>
                </Col>
                <Col span={2} align={'middle'} style={{margin: 'auto'}}>
                    <Button onClick={SubmitPoint}>Add point</Button>
                </Col>
            </Row>
        </Modal>
    </div>
}

const ClassInfo = (props) => {
    return <div>
        <ClassComponent schoolClass={props.schoolClass} studentsCount={props.studentsCount} worker={props.worker}
                        onSubmitClassChanges={props.onSubmitClassChanges}
                        onSubmitClassRemoving={props.onSubmitClassRemoving}
                        workers={props.workersWithoutClass}/>

        { props.classSchedule ? <ScheduleComponent classSchedule={props.classSchedule}
                           workers={props.workers} lessons={props.lessons}
                           times={props.times} auditoriums={props.auditoriums} classId={props.schoolClass.id}
                           onSubmitScheduleDay={props.onSubmitScheduleDay}
                           onSubmitRemovingScheduleDay={props.onSubmitRemovingScheduleDay}
                           onSubmitScheduleDayChanges={props.onSubmitScheduleDayChanges}
                           allSchedules={props.allSchedules}/> : null }
    </div>
}

export default ClassInfo