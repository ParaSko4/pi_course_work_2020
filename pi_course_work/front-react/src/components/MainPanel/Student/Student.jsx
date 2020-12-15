import React, {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Empty, Layout, List, Menu, Row, Table, Tabs} from "antd";
import {teacherPage} from "../../../resources/pages-setting";
import {createFromIconfontCN} from "@ant-design/icons";

let {Content} = Layout
const {TabPane} = Tabs;

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});


const days = [
    { key: 1, tab: 'Monday'},
    { key: 2, tab: 'Tuesday'},
    { key: 3, tab: 'Wednesday'},
    { key: 4, tab: 'Thursday'},
    { key: 5, tab: 'Friday'},
    { key: 6, tab: 'Saturday'},
]
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

const LessonsMarks = (props) => {
    let [currLesson, setCurrLesson] = useState(-1)

    return <Row>
        <Col span={24}>
            <Divider>Marks of lessons</Divider>
            <Row>
                <Col span={12}>
                    <Menu>
                        {props.lessons.filter(lesson => props.schedules.find(schedule => schedule.idlesson === lesson.id) ? lesson : false)
                            .map(lesson => {
                                return <Menu.Item key={lesson.id} onClick={() => setCurrLesson(lesson.id)}>
                                    {lesson.name}
                                </Menu.Item>
                            })}
                    </Menu>
                </Col>
                <Col offset={1} span={11}>
                    {
                        currLesson === -1 ? <Empty/> : <List
                            pagination={{
                                hideOnSinglePage: true,
                                pageSize: 9,
                            }}
                            dataSource={props.marks.filter(mark => mark.idstudent === props.personalData.studentId && mark.idlesson === currLesson)}
                            renderItem={item => (
                                <List.Item>
                                    <div style={{textAlign: 'center'}}>{item.mark}</div>
                                </List.Item>
                            )}
                        />
                    }
                </Col>
            </Row>
        </Col>
    </Row>
}

const Student = (props) => {
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
                let teacher = props.workers.find(worker => worker.workerId === schedule.idteacher)

                return {
                    id: schedule.id,
                    time: props.times.find(time => time.id === schedule.idtime).period,
                    auditoriumNumber: auditorium.number,
                    auditoriumName: auditorium.name,
                    lesson: props.lessons.find(lesson => lesson.id === schedule.idlesson).name,
                    teacher: teacher.fullName,
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


    return <Layout style={{minHeight: '80vh'}}>
        <Layout style={{backgroundColor: "white"}}>
            <Content style={{backgroundColor: "white"}}>
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Card title={
                                    <Row align={'middle'}>
                                        <Col span={10}>{props.personalData.fullName}</Col>
                                        <Col offset={11} span={1}>
                                            <Button icon={<IconFont type="icon-tuichu"/>} onClick={props.exitFromApp}/>
                                        </Col>
                                    </Row>
                                } bordered style={{width: 320}}>
                                    <p>Number : {props.personalData.number}</p>
                                    <p>Residence : {props.personalData.residence}</p>
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
                        <LessonsMarks schedules={props.schedules} marks={props.marks} lessons={props.lessons} personalData={props.personalData}/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    </Layout>
}

export default Student