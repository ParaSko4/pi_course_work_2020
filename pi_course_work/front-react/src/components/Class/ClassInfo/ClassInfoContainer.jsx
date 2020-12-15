import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import ClassInfo from "./ClassInfo";
import {
    addSchedule,
    removeClass,
    removeScheduleDay,
    updateClass,
    updateSchedule
} from "../../../redux/class-reducer";

const ClassInfoContainer = (props) => {
    const SubmitClassChanges = (schoolClass) => {
        props.updateClass(schoolClass)
    }

    const SubmitClassRemoving = () => {
        props.removeClass(props.schoolClass.id)
    }

    const SubmitScheduleDay = (schedule) => {
        props.addSchedule(schedule, props.schoolClass.id)
    }

    const SubmitScheduleDayChanges = (schedule) => {
        props.updateSchedule(schedule, props.schoolClass.id)
    }

    const SubmitRemovingScheduleDay = (day) => {
        props.removeScheduleDay(props.schoolClass.id, day)
    }

    return <ClassInfo {...props} onSubmitClassChanges={SubmitClassChanges} onSubmitClassRemoving={SubmitClassRemoving}
                      onSubmitScheduleDay={SubmitScheduleDay} onSubmitScheduleDayChanges={SubmitScheduleDayChanges}
                      onSubmitRemovingScheduleDay={SubmitRemovingScheduleDay} onSubmitScheduleDayChanges={SubmitScheduleDayChanges}/>
}

export default compose(
    connect(
        state => ({
            schoolClass: state.class.schoolClass,
            isScheduleUpload: state.class.isScheduleUpload,
            worker: state.class.worker,
            classSchedule: state.class.classSchedule,
            studentsCount: state.class.studentsCount,
            workersWithoutClass: state.manager.workersWithoutClass,
            workers: state.manager.workers,
            lessons: state.settings.lessons,
            times: state.settings.times,
            auditoriums: state.settings.auditoriums,
            allSchedules: state.class.allSchedules
        }),
        {updateClass, removeClass, addSchedule, updateSchedule, removeScheduleDay}
    )
)(ClassInfoContainer)