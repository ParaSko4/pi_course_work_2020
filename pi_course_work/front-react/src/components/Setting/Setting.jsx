import React, {useState} from "react";
import {
    Button,
    Card,
    Col, DatePicker,
    Divider, Drawer,
    Empty,
    Form,
    Layout,
    Menu,
    Modal, Pagination,
    Popover, Radio,
    Row,
    Space,
    Tabs,
    Typography
} from "antd";
import {Field, reduxForm} from "redux-form";
import {TextField} from "redux-form-antd";
import {requiredMes} from "../../utils/validators/common-validations";
import {formNames} from "../../resources/const-strings";
import {schoolClass} from "../../resources/pages-setting";
import {setAuditoriums} from "../../redux/setting-reducer";
import moment from "moment";
import {RowDrawer, SoloRowDrawer, TwoRowDrawer} from "../commons/DrawerElements";

const {Paragraph, Title} = Typography;
const {Content} = Layout;
const {TabPane} = Tabs;

let required = requiredMes('You should type your time!')

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 15},
};

const Auditoriums = (props) => {
    let [currPage, setCurrPage] = useState(1)
    let [auditoriumModal, setAuditoriumModal] = useState(false)
    let [drawerObject, setDrawerObject] = useState(props.auditoriums ? props.auditoriums[0] : null)
    let [drawerVisible, setDrawerVisible] = useState(false)

    const UpdateDrawer = ({type, value}) => {
        switch (type) {
            case 'Name':
                return setDrawerObject({...drawerObject, name: value})
            case 'Number':
                return setDrawerObject({...drawerObject, number: value})
        }
    }

    const Grid = (props) => {
        let colAuditoriums = []
        let Rows = []

        props.auditoriums.forEach((auditorium, index, arr) => {
            colAuditoriums.push(<Col key={auditorium.id} span={4}>
                    <Popover content={'Click to edit'}>
                        <Card style={{width: '120px', textAlign: 'center'}}
                              hoverable
                              onClick={() => {
                                  setDrawerVisible(true)
                                  setDrawerObject(auditorium)
                              }}>
                            <Space align={'center'} direction={'vertical'}>
                                {auditorium.name}
                                {auditorium.number}
                            </Space>
                        </Card>
                    </Popover>
                </Col>
            )
            if ((index + 1) % schoolClass.auditoriumCardCountCol === 0) {
                Rows.push(<Row key={'auditorium' + auditorium.id} gutter={[20, 24]}>
                        {colAuditoriums}
                    </Row>
                )
                colAuditoriums = []
            }
            if (props.auditoriums.length === (index + 1) && (index + 1) % schoolClass.auditoriumCardCountCol !== 0) {
                Rows.push(<Row key={'small classes'} gutter={[20, 24]}>
                        {colAuditoriums}
                    </Row>
                )
            }
        })

        return <div style={{margin: '23px 0 0 0', height: '50vh'}}>
            {Rows}
        </div>;
    }

    const AuditoriumForm = () => {
        return <Form>
            <Field label={'Name: '} name={'name'} {...formItemLayout}
                   component={TextField}
                   validate={[required]}
                   placeholder={'Cabinet of mathematics'}
            />
            <Field label={'Number: '} name={'number'} {...formItemLayout}
                   component={TextField}
                   validate={[required]}
                   placeholder={'208-1'}
            />
        </Form>
    }

    const AuditoriumReduxForm = reduxForm({
        form: formNames.addAuditorium,
        onSubmit: props.onSubmitAuditorium,
        onSubmitSuccess: () => setAuditoriumModal(false)
    })(AuditoriumForm)

    const handleSubmit = () => {
        props.remoteSubmit(formNames.addAuditorium)
    }

    return <div>
        <Divider orientation={'left'}>Auditoriums</Divider>
        <Row style={{margin: '23px 0 0 0'}}>
            <Col span={12}>
                <Button onClick={() => setAuditoriumModal(true)}>Add auditorium</Button>
            </Col>
            {/*<Col span={12}>*/}
            {/*    <Button style={{float: 'right'}} danger>Delete auditoriums</Button>*/}
            {/*</Col>*/}
        </Row>
        {
            props.auditoriumsCount === 0 && <Empty/> ||
            <Grid auditoriums={props.auditoriums.filter(
                (auditorium, index, arr) =>
                    index < currPage * schoolClass.auditoriumPageSize &&
                    index > currPage * schoolClass.auditoriumPageSize - schoolClass.auditoriumPageSize - 1 ? auditorium : false
            )}/>
        }
        <Row>
            <Col span={24}>
                <Pagination
                    style={{float: 'left'}}
                    onChange={page => setCurrPage(page)}
                    defaultCurrent={currPage}
                    total={props.auditoriumsCount}
                    pageSize={schoolClass.auditoriumPageSize}
                    pageSizeOptions={[]}
                    hideOnSinglePage
                />
            </Col>
        </Row>
        <Modal
            title={'Auditorium creation modal'}
            visible={auditoriumModal}
            onOk={handleSubmit}
            onCancel={() => setAuditoriumModal(false)}
        >
            <AuditoriumReduxForm/>
        </Modal>
        {
            drawerObject ? <Drawer
                width={420}
                placement="right"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
            >
                <Title style={{float: 'left'}} level={2}>Auditorium editor</Title>
                <Divider/>
                <TwoRowDrawer title1={"Name"} title2={"Number"}
                              content1={drawerObject.name}
                              content2={drawerObject.number}
                              onChangeMethod={UpdateDrawer}
                />
                <Row>
                    <Col span={12}>
                        <Button onClick={() => props.submitChanges(drawerObject)}>Submit Change</Button>
                    </Col>
                    <Col span={12}>
                        <Button style={{float: 'right'}}
                                danger
                                onClick={() => {
                                    props.removeAuditorium(drawerObject.id)
                                    setDrawerVisible(false)
                                }}>
                            Remove auditorium
                        </Button>
                    </Col>
                </Row>
                <Divider/>
            </Drawer> : null
        }
    </div>
}

const Times = (props) => {
    let dayTimes = props.times !== null ? props.times.filter(time => time.dayhalf === "d" ? time : false) : []
    let eveningTimes = props.times !== null ? props.times.filter(time => time.dayhalf === "e" ? time : false) : []

    let [timeModal, setTimeModal] = useState(false)
    let [currShift, setCurrShift] = useState('Day shift')
    let [totalTimes, setTotalTimes] = useState(dayTimes.length)
    let [currPage, setCurrPage] = useState(1)
    let [drawerObject, setDrawerObject] = useState(props.times ? props.times[0] : null)
    let [drawerVisible, setDrawerVisible] = useState(false)

    const UpdateDrawer = ({type, value}) => {
        switch (type) {
            case 'Period':
                return setDrawerObject({...drawerObject, period: value})
        }
    }

    const Grid = (props) => {
        let colTimes = []
        let Rows = []

        props.times.forEach((time, index, arr) => {
            colTimes.push(<Col key={time.id} span={4}>
                    <Popover content={'Click to edit'}>
                        <Card style={{width: '120px', textAlign: 'center'}}
                              hoverable
                              onClick={() => {
                                  setDrawerObject(time)
                                  setDrawerVisible(true)
                              }}>
                            {time.period}
                        </Card>
                    </Popover>
                </Col>
            )
            if ((index + 1) % schoolClass.timesCardCountCol === 0) {
                Rows.push(<Row key={'times' + time.id} gutter={[20, 24]}>
                        {colTimes}
                    </Row>
                )

                colTimes = []
            }
            if (props.times.length === (index + 1) && (index + 1) % schoolClass.timesCardCountCol !== 0) {
                Rows.push(<Row key={'small classes'} gutter={[20, 24]}>
                        {colTimes}
                    </Row>
                )
            }
        })

        return <div style={{height: '50vh'}}>
            {Rows}
        </div>;
    }

    const SubmitTimeReduxForm = (values) => {
        let valueForApi = {
            ...values,
            dayhalf: currShift === 'Day shift' ? 'd' : 'e'
        }
        props.onSubmitTime(valueForApi)
    }

    const TimeForm = () => {
        return <Form>
            <Field label={'Time: '} name={'period'} {...formItemLayout}
                   component={TextField}
                   validate={[required]}
                   placeholder={'10:00 - 10:45'}
            />
        </Form>
    }

    const TimeReduxForm = reduxForm({
        form: formNames.addTime,
        onSubmit: SubmitTimeReduxForm,
        onSubmitSuccess: () => setTimeModal(false)
    })(TimeForm)

    const handleSubmit = () => {
        props.remoteSubmit(formNames.addTime)
    }

    const callback = (key) => {
        setCurrShift(key);
        if (key === 'Day shift') {
            setTotalTimes(dayTimes.length)
        } else {
            setTotalTimes(eveningTimes.length)
        }
    }

    return <div>
        <Divider orientation={'left'}>Times</Divider>
        <Tabs defaultActiveKey="1" onChange={callback} style={{margin: '15px 0 0 0', minHeight: '55vh'}}
              tabBarExtraContent={
                  <div>
                      <Button onClick={() => setTimeModal(true)}>Add time</Button>
                      {/*<Button danger style={{margin: '0 0 0 30px'}}>Delete times</Button>*/}
                  </div>
              }>
            <TabPane tab="Day shift" key="Day shift">
                {
                    dayTimes.length === 0 && <Empty/> ||
                    <Grid times={dayTimes.filter(
                        (time, index, arr) =>
                            index < currPage * schoolClass.timesPageSize &&
                            index > currPage * schoolClass.timesPageSize - schoolClass.timesPageSize - 1 ? time : false
                    )}/>
                }
            </TabPane>
            <TabPane tab="Evening shift" key="Evening shift">
                {
                    eveningTimes.length === 0 && <Empty/> ||
                    <Grid times={eveningTimes.filter(
                        (time, index, arr) =>
                            index < currPage * schoolClass.timesPageSize &&
                            index > currPage * schoolClass.timesPageSize - schoolClass.timesPageSize - 1 ? time : false
                    )}/>
                }
            </TabPane>
        </Tabs>
        <Row>
            <Col span={24}>
                <Pagination
                    style={{float: 'left'}}
                    onChange={page => setCurrPage(page)}
                    defaultCurrent={currPage}
                    total={totalTimes}
                    pageSize={schoolClass.timesPageSize}
                    pageSizeOptions={[]}
                    hideOnSinglePage
                />
            </Col>
        </Row>
        <Modal
            title={'Add time to ' + currShift}
            visible={timeModal}
            onOk={handleSubmit}
            onCancel={() => setTimeModal(false)}
        >
            <TimeReduxForm/>
        </Modal>
        {
            drawerObject ? <Drawer
                width={420}
                placement="right"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
            >
                <Title style={{float: 'left'}} level={2}>Time editor</Title>
                <Divider/>
                <SoloRowDrawer title={"Period"} content={drawerObject.period} onChangeMethod={UpdateDrawer}/>
                <Row>
                    <Col span={12}>
                        <Button onClick={() => props.submitChanges(drawerObject)}>Submit Change</Button>
                    </Col>
                    <Col span={12}>
                        <Button style={{float: 'right'}}
                                danger
                                onClick={() => {
                                    props.removeTime(drawerObject.id)
                                    setDrawerVisible(false)
                                }}>
                            Remove time
                        </Button>
                    </Col>
                </Row>
                <Divider/>
            </Drawer> : null
        }
    </div>
}

const LessonsComponent = (props) => {
    let [currPage, setCurrPage] = useState(1)
    let [lessonModal, setLessonModal] = useState(false)
    let [drawerObject, setDrawerObject] = useState(props.lessons ? props.lessons[0] : null)
    let [drawerVisible, setDrawerVisible] = useState(false)

    const UpdateDrawer = ({type, value}) => {
        switch (type) {
            case 'Name':
                return setDrawerObject({...drawerObject, name: value})
        }
    }

    const Grid = (props) => {
        let colLessons = []
        let Rows = []

        props.lessons.forEach((lesson, index, arr) => {
            colLessons.push(<Col key={lesson.id} span={4}>
                    <Popover content={'Click to edit'}>
                        <Card style={{width: '120px', textAlign: 'center'}}
                              hoverable
                              onClick={() => {
                                  setDrawerVisible(true)
                                  setDrawerObject(lesson)
                              }}>
                            <div style={{textAlign:'center'}}>
                                {lesson.name}
                            </div>
                        </Card>
                    </Popover>
                </Col>
            )
            if ((index + 1) % schoolClass.lessonCardCountCol === 0) {
                Rows.push(<Row key={'lesson' + lesson.id} gutter={[20, 24]}>
                        {colLessons}
                    </Row>
                )
                colLessons = []
            }
            if (props.lessons.length === (index + 1) && (index + 1) % schoolClass.lessonCardCountCol !== 0) {
                Rows.push(<Row key={'lesson small class'} gutter={[20, 24]}>
                        {colLessons}
                    </Row>
                )
            }
        })

        return <div style={{margin: '23px 0 0 0', height: '50vh'}}>
            {Rows}
        </div>;
    }

    const LessonForm = () => {
        return <Form>
            <Field label={'Name: '} name={'name'} {...formItemLayout}
                   component={TextField}
                   validate={[required]}
                   placeholder={'Mathematics'}
            />
        </Form>
    }

    const LessonReduxForm = reduxForm({
        form: formNames.addLesson,
        onSubmit: props.onSubmitLesson,
        onSubmitSuccess: () => setLessonModal(false)
    })(LessonForm)

    const handleSubmit = () => {
        props.remoteSubmit(formNames.addLesson)
    }

    return <div>
        <Divider orientation={'left'}>Lessons</Divider>
        <Row style={{margin: '23px 0 0 0'}}>
            <Col span={12}>
                <Button onClick={() => setLessonModal(true)}>Add lesson</Button>
            </Col>
            {/*<Col span={12}>*/}
            {/*    <Button style={{float: 'right'}} danger>Delete lessons</Button>*/}
            {/*</Col>*/}
        </Row>
        {
            props.lessonsCount === 0 && <Empty/> ||
            <Grid lessons={props.lessons.filter(
                (lesson, index, arr) =>
                    index < currPage * schoolClass.lessonPageSize &&
                    index > currPage * schoolClass.lessonPageSize - schoolClass.lessonPageSize - 1 ? lesson : false
            )}/>
        }
        <Row>
            <Col span={24}>
                <Pagination
                    style={{float: 'left'}}
                    onChange={page => setCurrPage(page)}
                    defaultCurrent={currPage}
                    total={props.lessonsCount}
                    pageSize={schoolClass.lessonPageSize}
                    pageSizeOptions={[]}
                    hideOnSinglePage
                />
            </Col>
        </Row>
        <Modal
            title={'Lesson creation modal'}
            visible={lessonModal}
            onOk={handleSubmit}
            onCancel={() => setLessonModal(false)}
        >
            <LessonReduxForm/>
        </Modal>
        {
            drawerObject ? <Drawer
                width={420}
                placement="right"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
            >
                <Title style={{float: 'left'}} level={2}>Lesson editor</Title>
                <Divider/>
                <SoloRowDrawer title={"Name"}
                              content={drawerObject.name}
                              onChangeMethod={UpdateDrawer}
                />
                <Row>
                    <Col span={12}>
                        <Button onClick={() => props.submitChanges(drawerObject)}>Submit Change</Button>
                    </Col>
                    <Col span={12}>
                        <Button style={{float: 'right'}}
                                danger
                                onClick={() => {
                                    props.removeLesson(drawerObject.id)
                                    setDrawerVisible(false)
                                }}>
                            Remove lesson
                        </Button>
                    </Col>
                </Row>
                <Divider/>
            </Drawer> : null
        }
    </div>
}

const Setting = (props) => {
    let [menuOption, setMenuOption] = useState('1')
    let [drawerObject, setDrawerObject] = useState(props.school)
    let [drawerVisible, setDrawerVisible] = useState(false)

    const UpdateDrawer = ({type, value}) => {
        switch (type) {
            case 'Name':
                return setDrawerObject({...drawerObject, name: value})
            case 'Location':
                return setDrawerObject({...drawerObject, location: value})
        }
    }

    return <Layout style={{minHeight: '70vh'}}>
        <Layout style={{backgroundColor: "white"}}>
            <Content style={{backgroundColor: "white"}}>
                <Row>
                    <Col span={6}>
                        <Row>
                            <Col span={12}>
                                <Popover content={'Click to edit info'}>
                                    <Card style={{width: '300px'}}
                                          hoverable
                                          title={<Title level={3}>{props.school.name}</Title>}
                                          onClick={() => setDrawerVisible(true)}
                                    >
                                        Location: {props.school.location}
                                    </Card>
                                </Popover>
                            </Col>
                        </Row>
                        <Row style={{margin: '10px 15px 0 0', float: 'right'}}>
                            <Col span={12}>
                                <Menu mode="inline"
                                      defaultOpenKeys={['1']}
                                      onClick={e => setMenuOption(e.key)}
                                      style={{width: '150px'}}>
                                    <Menu.Item key="1">Auditoriums</Menu.Item>
                                    <Menu.Item key="2">Times</Menu.Item>
                                    <Menu.Item key="3">Lessons</Menu.Item>
                                </Menu>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={17} offset={1}>
                        {menuOption === '1' &&
                        <Auditoriums auditoriums={props.auditoriums} auditoriumsCount={props.auditoriums.length}
                                     remoteSubmit={props.remoteSubmit}
                                     onSubmitAuditorium={props.onSubmitAuditorium}
                                     submitChanges={props.submitAuditoriumChanges}
                                     removeAuditorium={props.removeAuditorium}/>}
                        {menuOption === '2' &&
                        <Times times={props.times} remoteSubmit={props.remoteSubmit}
                               onSubmitTime={props.onSubmitTime} submitChanges={props.submitTimeChanges}
                               removeTime={props.removeTime}/>}
                        {menuOption === '3' &&
                        <LessonsComponent lessons={props.lessons} lessonsCount={props.lessonsCount} remoteSubmit={props.remoteSubmit}
                                          onSubmitLesson={props.onSubmitLesson}
                                          submitChanges={props.submitLessonChanges}
                                          removeLesson={props.removeLesson}/>}
                    </Col>
                </Row>
                <Drawer
                    width={420}
                    placement="right"
                    closable={false}
                    onClose={() => setDrawerVisible(false)}
                    visible={drawerVisible}
                >
                    <Title style={{float: 'left'}} level={2}>School editor</Title>
                    <Divider/>
                    <TwoRowDrawer title1={"Name"} title2={"Location"}
                                  content1={drawerObject.name}
                                  content2={drawerObject.location}
                                  onChangeMethod={UpdateDrawer}
                    />
                    <Row>
                        <Col span={12}>
                            <Button onClick={() => props.submitSchoolChanges(drawerObject)}>Submit Change</Button>
                        </Col>
                        <Col span={12}>
                            <Button style={{float: 'right'}}
                                    danger
                                    onClick={() => {
                                        props.removeSchool()
                                        setDrawerVisible(false)
                                    }}>
                                DELETE SCHOOL
                            </Button>
                        </Col>
                    </Row>
                    <Divider/>
                </Drawer>
            </Content>
        </Layout>
    </Layout>
}

export default Setting