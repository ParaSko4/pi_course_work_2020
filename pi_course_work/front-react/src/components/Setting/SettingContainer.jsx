import React, {useEffect} from "react";
import Setting from "./Setting";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {withFatherRoleRedirect} from "../../hoc/withFatherRoleRedirect";
import {
    addAuditorium, addLesson,
    addTime,
    removeAuditorium, removeLesson, removeSchool,
    removeTime, startInitializingSetting,
    updateAuditorium, updateLesson, updateSchool,
    updateTime
} from "../../redux/setting-reducer";
import {remoteSubmit} from "../../redux/redux-form";
import {Loader} from "../commons/Loader";

const SettingContainer = (props) => {
    useEffect(() => {
        props.startInitializingSetting()
    }, [])

    const SubmitAuditorium = (auditorium) => {
        props.addAuditorium(auditorium)
    }

    const SubmitTime = (time) => {
        props.addTime(time)
    }

    const SubmitLesson = (lesson) => {
        props.addLesson(lesson)
    }

    const SubmitAuditoriumChanges = (auditorium) => {
        props.updateAuditorium(auditorium)
    }

    const SubmitTimeChanges = (time) => {
        props.updateTime(time)
    }

    const SubmitLessonChanges = (lesson) => {
        props.updateLesson(lesson)
    }

    const SubmitSchoolChanges = (school) => {
        props.updateSchool(school)
    }

    const SubmitRemovingAuditorium = (id) => {
        props.removeAuditorium(id)
    }

    const SubmitRemovingTime = (id) => {
        props.removeTime(id)
    }

    const SubmitRemovingLesson = (id) => {
        props.removeLesson(id)
    }

    const SubmitRemovingSchool = () => {
        props.removeSchool()
    }

    if (props.isInitializing){
        return <Setting {...props} onSubmitTime={SubmitTime} onSubmitAuditorium={SubmitAuditorium}
                        onSubmitLesson={SubmitLesson}
                        submitAuditoriumChanges={SubmitAuditoriumChanges} submitTimeChanges={SubmitTimeChanges}
                        submitLessonChanges={SubmitLessonChanges} removeTime={SubmitRemovingTime}
                        removeAuditorium={SubmitRemovingAuditorium} removingLesson={SubmitRemovingLesson}
                        removeSchool={SubmitRemovingSchool} submitSchoolChanges={SubmitSchoolChanges}/>
    }
    return <Loader/>
}

export default compose(
    withAuthRedirect,
    withFatherRoleRedirect,
    connect(
        state => ({
            isInitializing: state.settings.isInitializing,
            times: state.settings.times,
            timesCount: state.settings.timesCount,
            auditoriums: state.settings.auditoriums,
            auditoriumsCount: state.settings.auditoriumsCount,
            lessons: state.settings.lessons,
            lessonsCount: state.settings.lessonsCount,
            school: state.settings.school,
        }),
        {
            startInitializingSetting, remoteSubmit, addTime, addAuditorium,
            updateTime, updateAuditorium, removeAuditorium, removeTime, updateSchool,
            addLesson, updateLesson, removeLesson, removeSchool
        }
    )
)(SettingContainer)