import React, {useEffect, useState} from "react";
import {
    Avatar, Button,
    Card,
    Col,
    Divider,
    Empty, InputNumber,
    Layout,
    List,
    Menu, Modal,
    Pagination,
    Row,
    Space,
    Table,
    Tabs
} from "antd";
import {teacherPage} from "../../../resources/pages-setting";
import {createFromIconfontCN} from '@ant-design/icons';

let {Content} = Layout
const {TabPane} = Tabs;

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const days = [
    {key: 1, tab: 'Monday'},
    {key: 2, tab: 'Tuesday'},
    {key: 3, tab: 'Wednesday'},
    {key: 4, tab: 'Thursday'},
    {key: 5, tab: 'Friday'},
    {key: 6, tab: 'Saturday'},
]

const LessonsMenu = (props) => {
    const LessonChange = e => {
        props.lessonClick(parseInt(e.key))
    }

    return <Menu mode="inline" style={{width: 256, margin: '0 0 0 10px'}} onClick={LessonChange}>
        {props.lessons.filter(lesson => {
            return props.schedules.find(schedule => schedule.idlesson === lesson.id) ? lesson : false
        }).map(lesson => {
            return <Menu.Item key={lesson.id}>
                {lesson.name}
            </Menu.Item>
        })}
    </Menu>
}

const Grid = (props) => {
    let colClasses = []
    let Rows = []

    props.classes.forEach((schoolClass, index, arr) => {
        colClasses.push(<Col key={schoolClass.id} span={4}>
                <Card style={{width: '120px', textAlign: 'center'}}
                      hoverable
                      onClick={() => {
                          props.classClick(schoolClass.id)
                      }}>
                    <Space align={'center'} direction={'vertical'}>
                        {schoolClass.number + schoolClass.letter}
                    </Space>
                </Card>
            </Col>
        )
        if ((index + 1) % teacherPage.classesColCount === 0) {
            Rows.push(<Row key={'class' + schoolClass.id} gutter={[20, 24]}>
                    {colClasses}
                </Row>
            )
            colClasses = []
        }
        if (props.classes.length === (index + 1) && (index + 1) % teacherPage.classesColCount !== 0) {
            Rows.push(<Row key={'small classes'} gutter={[20, 24]}>
                    {colClasses}
                </Row>
            )
        }
    })

    return <div style={{margin: '23px 0 0 0', height: '65vh'}}>
        {Rows}
    </div>;
}

const ChoiceClassAndLesson = (props) => {
    let [currPage, setCurrPage] = useState(1)
    let [currLesson, setCurrLesson] = useState(-1)
    let [currClasses, setCurrClasses] = useState([])

    const LessonClick = (lessonId) => {
        setCurrLesson(lessonId)
        setCurrClasses(props.classes.filter(schoolClass => {
            return props.schedules.find(schedule => schedule.idclass === schoolClass.id && schedule.idlesson === lessonId) ? schoolClass : false
        }))

        props.setLesson(lessonId)
    }

    const ClassClick = (classId) => {
        props.setClass(classId)
    }

    return <Row>
        <Col span={12}>
            <Divider>Your Lessons</Divider>
            <LessonsMenu schedules={props.schedules} lessons={props.lessons} lessonClick={LessonClick}/>
        </Col>
        <Col span={12}>
            <Divider>Your Classes</Divider>
            {
                currLesson === -1 ? <Empty/> : <div>
                    <Grid classClick={ClassClick}
                          classes={currClasses.filter((schoolClass, index, arr) =>
                              index < currPage * teacherPage.classesPageSize &&
                              index > currPage * teacherPage.classesPageSize - teacherPage.classesPageSize - 1 ? schoolClass : false
                          )}/>
                    <Row>
                        <Col span={24}>
                            {currClasses.length !== 0 && <Pagination
                                style={{float: 'left'}}
                                onChange={page => setCurrPage(page)}
                                defaultCurrent={currPage}
                                total={currClasses.length}
                                pageSize={teacherPage.classesPageSize}
                                pageSizeOptions={[]}
                            />}
                        </Col>
                    </Row>
                </div>
            }
        </Col>
    </Row>
}

const StudentWithActions = (props) => {
    let [currStudents, setCurrStudents] = useState([])
    let [currStudent, setCurrStudent] = useState(-1)
    let [currStudentMarks, setStudentMarks] = useState([])

    let [modalVisible, setModalVisible] = useState(false)
    let [action, setAction] = useState('Add')
    let [currMark, setCurrMark] = useState(-1)
    let [markValue, setMarkValue] = useState(5)

    useEffect(() => {
        setCurrStudents(props.students)
        setStudentMarks(currStudent !== -1 ? props.marks.filter(mark => mark.idstudent === currStudent) : [])
    }, [props.students, props.marks])

    const showStudentMarks = (studentId) => {
        props.SetStudentClickedOn(studentId)

        setCurrStudent(studentId)
        setStudentMarks(props.marks.filter(mark => mark.idstudent === studentId))
    }

    const ShowModalAddMark = () => {
        setAction('Add')
        setModalVisible(true)
    }

    const ShowModalUpdateMark = (id) => {
        setAction('Update')

        let findingMark = currStudentMarks.find(mark => mark.id === id)

        setCurrMark(findingMark)
        setMarkValue(findingMark.mark)

        setModalVisible(true)
    }

    const RemoveMark = (id) => {
        props.removeMark(id)
    }

    const handleSubmitAction = () => {
        switch (action) {
            case 'Add':
                props.addMark(markValue)
                break;
            case 'Update':
                props.updateMark(currMark.id, markValue)
                break;
        }
        setModalVisible(false)
    }

    const onChangeMark = mark => {
        setMarkValue(mark)
    }

    return <Row>
        <Col span={12}>
            <Divider>Students</Divider>
            {
                currStudents ? <List
                    itemLayout="horizontal"
                    dataSource={currStudents}
                    pagination={{
                        pageSize: teacherPage.studentsPageSize,
                        hideOnSinglePage: true
                    }}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                title={<Button type={"link"}
                                               onClick={() => showStudentMarks(item.studentId)}>{item.middlename + ' ' + item.name}</Button>}
                            />
                        </List.Item>
                    )}
                /> : <Empty/>
            }

        </Col>
        <Col offset={1} span={11}>
            <Divider>Student Marks</Divider>
            {
                currStudentMarks ? <List
                    style={{width: '20vw', minHeight: '65vh'}}
                    itemLayout="horizontal"
                    dataSource={currStudentMarks}
                    pagination={{
                        pageSize: teacherPage.marksPageSize,
                        hideOnSinglePage: true
                    }}
                    renderItem={item => <List.Item>
                        <Row align={'middle'}>
                            <Col span={16} style={{textAlign: 'center'}}>
                                {item.mark}
                            </Col>
                            <Col span={8}>
                                <Space direction={'horizontal'}>
                                    <Button type={'link'} onClick={() => RemoveMark(item.id)}>Remove</Button>
                                    <Button type={'link'} onClick={() => ShowModalUpdateMark(item.id)}>Update</Button>
                                </Space>
                            </Col>
                        </Row>
                    </List.Item>}
                /> : <Empty/>
            }
            <Button onClick={ShowModalAddMark} style={{float: 'right'}}>Add mark</Button>
        </Col>
        <Modal
            title={action + ' mark'}
            visible={modalVisible}
            onOk={handleSubmitAction}
            onCancel={() => setModalVisible(false)}
        >
            <Row align={'middle'}>
                <Col span={12}>
                    <div style={{float: 'right', padding: '0 10px'}}>
                        Mark :
                    </div>
                </Col>
                <Col span={12}>
                    <InputNumber min={1} max={10} value={markValue} onChange={onChangeMark}/>
                </Col>
            </Row>
        </Modal>
    </Row>
}

const Teacher = (props) => {
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
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
        },
    ]
    const ScheduleCompareFunc = (a, b) => {
        if (a.time > b.time) {
            return 1;
        } else if (a.time < b.time) {
            return -1;
        }

        return 0;
    }
    const GetCurrScheduleDay = day => {
        return props.schedules ? props.schedules
            .filter(schedule => day.key && schedule.day === day.key || day && schedule.day === day ? schedule : false) : []
    }
    const GetScheduleForTable = day => {
        let scheduleDay = GetCurrScheduleDay(day)
        return scheduleDay ?
            scheduleDay.map(schedule => {
                let auditorium = props.auditoriums.filter(auditorium => auditorium.id === schedule.idauditorium ? auditorium : false)[0]
                let schoolClass = props.classes.find(schoolClass => schoolClass.id === schedule.idclass)
                return {
                    id: schedule.id,
                    time: props.times.find(time => time.id === schedule.idtime).period,
                    auditoriumNumber: auditorium.number,
                    auditoriumName: auditorium.name,
                    lesson: props.lessons.find(lesson => lesson.id === schedule.idlesson).name,
                    class: schoolClass.number + schoolClass.letter,
                }
            }).sort(ScheduleCompareFunc) : []
    }

    let [day, setDay] = useState(days[0].key)

    let [scheduleDataForTable, setScheduleDataForTable] = useState(GetScheduleForTable(days[0].key))

    useEffect(() => {
        setScheduleDataForTable(GetScheduleForTable(day))
    }, [props.schedules])

    const TabsChanges = (key) => {
        setDay(parseInt(key))
        let scheduleForTable = GetScheduleForTable(parseInt(key))
        setScheduleDataForTable(scheduleForTable)
    }

    let [lesson, setLesson] = useState(-1)
    let [schoolClass, setClass] = useState(-1)
    let [student, setStudent] = useState(-1)

    let [studentsVisible, setStudentsVisible] = useState(false)

    const SetLessonClickedOn = (lessonId) => {
        setLesson(lessonId)
    }

    const SetClassClickedOn = (classId) => {
        setClass(classId)
        props.loadClassStudents(classId)
        setStudentsVisible(true)
    }

    const SetStudentClickedOn = (studentId) => {
        setStudent(studentId)
    }

    const AddMarkToStudent = (mark) => {
        props.AddMark(lesson, student, mark)
    }

    return <Layout style={{minHeight: '80vh'}}>
        <Layout style={{backgroundColor: "white"}}>
            <Content style={{backgroundColor: "white"}}>
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Card title={
                                    <Row align={'middle'}>
                                        <Col span={10}>{props.worker.fullName}</Col>
                                        <Col offset={11} span={1}>
                                            <Button icon={<IconFont type="icon-tuichu"/>} onClick={props.exitFromApp}/>
                                        </Col>
                                    </Row>
                                } bordered style={{width: 320}}>
                                    <p>Number : {props.worker.number}</p>
                                    <p>Residence : {props.worker.residence}</p>
                                    <p>Position : {props.worker.position}</p>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Tabs onChange={TabsChanges} style={{minHeight: '50vh'}}>
                                    {days.map(day => <TabPane tab={day.tab} key={day.key}>
                                            {
                                                scheduleDataForTable.length === 0 ? <Empty/> :
                                                    <Table dataSource={scheduleDataForTable} columns={ScheduleDayColumns}
                                                           pagination={{pageSize: teacherPage.schedulePageSize, hideOnSinglePage: true}}/>
                                            }
                                        </TabPane>
                                    )}
                                </Tabs>
                            </Col>
                        </Row>
                    </Col>
                    <Col offset={1} span={11}>
                        {
                            studentsVisible ?
                                <StudentWithActions students={props.students} marks={props.marks}
                                                    addMark={AddMarkToStudent}
                                                    SetStudentClickedOn={SetStudentClickedOn}
                                                    removeMark={props.RemoveMark}
                                                    updateMark={props.UpdateMark}/> :
                                <ChoiceClassAndLesson setLesson={SetLessonClickedOn} setClass={SetClassClickedOn}
                                                      schedules={props.schedules} classes={props.classes}
                                                      lessons={props.lessons}/>
                        }
                    </Col>
                </Row>
            </Content>
        </Layout>
    </Layout>
}

export default Teacher