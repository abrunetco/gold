import { faker } from '@faker-js/faker';
import { faker as faFaker } from '@faker-js/faker/locale/fa';
import { AttendanceStatuses } from '@sms/defs/src/fragments/attendances-statuses';
import { COURSE_MAP } from '@sms/defs/src/fragments/courses';
import { Genderypes } from '@sms/defs/src/fragments/gender-types';
import { GradeTerms } from '@sms/defs/src/fragments/grade-terms';
import { GRADE_MAP } from '@sms/defs/src/fragments/grades';
import { GroupAccessTypes } from '@sms/defs/src/fragments/group-access-types';
import { Mediatypes } from '@sms/defs/src/fragments/media';
import { Plantypes } from '@sms/defs/src/fragments/plans-types';
import { Roletypes } from '@sms/defs/src/fragments/role-types';
import { SCHEDULE_PATTERN_MAP, SchedulePatternTypes } from '@sms/defs/src/fragments/schedule-pattern-types';
import { ThisYear } from '@sms/defs/src/fragments/years';
import _ from 'lodash';
import { Assessments } from '../../src/services-entities/assessments/schema';
import { assessmentsPath } from '../../src/services-entities/assessments/shared';
import { classroomsPath } from '../../src/services-entities/classrooms/shared';
import { Courses, coursesPath } from '../../src/services-entities/courses/shared';
import { gradesPath } from '../../src/services-entities/grades/shared';
import { Homeworks } from '../../src/services-entities/homeworks/schema';
import { homeworksPath } from '../../src/services-entities/homeworks/shared';
import { Results } from '../../src/services-entities/results/schema';
import { resultsPath } from '../../src/services-entities/results/shared';
import { Sessions } from '../../src/services-entities/sessions/schema';
import { sessionsPath } from '../../src/services-entities/sessions/shared';
import { parentsPath } from '../../src/services-peoples/parents/shared';
import { studentsPath } from '../../src/services-peoples/students/shared';
import { teachersPath } from '../../src/services-peoples/teachers/shared';
import { groupsPath } from '../../src/services/groups/shared';
import { Users, usersPath } from '../../src/services/users/shared';
import { DataContext, TestMeta, commons, makeContext, userCommons } from './../utils/collections';
import { getCourseSessions, getTermRange, getTermWeeks } from '@sms/app/src/utils/schedule';
import { SessionStatuses } from '@sms/defs/src/fragments/session-statuses';
import { jalaali } from '@sms/app/src/utils/moment';

export const fakeEmail = (name: String) => `${name}@demo.schools.me`

function normalizeScore(s: number, max = 20, divider = 4): number {
  const nscore = (~~(s / 20 * max * divider)) / divider
  return Math.max(0, Math.min(max, nscore))
}

function makeUser(username: string, groupId: string, role: Roletypes): Users {
  const email = fakeEmail(username),
    password = "$2a$10$q4UfToeeFyIZlAu7SrTr0OomYQc0qv60YUVG1TDi5ch2Eov1bNm2m" // === await bcrypt.hash("123456", 10)

  return {
    ...commons(),
    ...userCommons,
    __typename: usersPath,
    firstName: faFaker.person.firstName(),
    lastName: faFaker.person.lastName(),
    avatar: [{
      id: 'external',
      type: Mediatypes.IMAGE,
      external: {
        path: faFaker.image.avatar()
      }
    }],
    gender: Genderypes.MAN,
    nationalId: faker.string.numeric(10),
    email,
    password,
    access: [
      { group: groupId, role }
    ],
  }
}

function addParent(ctxt: DataContext, id: string, groupId: string): string {
  const user = makeUser(id, groupId, Roletypes.parent)
  ctxt.parents.push({
    ...user,
    __typename: parentsPath
  })
  return user.uid
}

function addStudentWithParent(ctxt: DataContext, stdn: string, parn: string, groupId: string) {
  const parentId = addParent(ctxt, parn, groupId)
  const user = makeUser(stdn, groupId, Roletypes.student)
  const l = _.random(8, 16)
  const m = _.random(16, 18)
  const h = _.random(18, 20)
  ctxt.students.push({
    ...user,
    __typename: studentsPath,
    code: faker.string.numeric(10),
    parents: [parentId],
    meta: {
      upScore: _.random(m, h),
      doScore: _.random(l, m),
    }
  })

  return user.uid
}

function addTeacher(ctxt: DataContext, id: string, groupId: string) {
  const user = makeUser(id, groupId, Roletypes.teacher)

  ctxt.teachers.push({
    ...user,
    __typename: teachersPath,
  })
  return user.uid
}

function generateSomeResultFor(ctxt: DataContext, coursesData: Courses, students: string[]) {
  const studentByUid = _.keyBy(ctxt.students, 'uid')
  const range = getTermRange(coursesData.year, GradeTerms.T3)
  const weeks = getTermWeeks(range)
  const sessionsSchedules = getCourseSessions(weeks, coursesData, SCHEDULE_PATTERN_MAP[SchedulePatternTypes.MORNING])
  sessionsSchedules.pop()
  sessionsSchedules.pop()
  sessionsSchedules.pop()
  sessionsSchedules.pop()

  const sessionsData = sessionsSchedules.map((ss): Sessions => {
    return {
      ...commons(),
      uid: ss.uid,
      topics: [],
      group: coursesData.group,
      year: coursesData.year,
      __typename: sessionsPath,
      status: SessionStatuses.OPEN,
      course: coursesData.uid,
      grade: coursesData.grade,
      teacher: coursesData.teacher ?? ''
    }
  })

  const assessmetsData = _.sampleSize(sessionsSchedules, 6).map((ss, i): Assessments & TestMeta => {
    const [, y, m, d] = ss.uid.split('-'),
      date = jalaali([y, m, d].join('-'), 'jYYYY-jMM-jDD').toDate()
    return {
      ...commons(),
      topics: [],
      group: coursesData.group,
      year: coursesData.year,
      __typename: assessmentsPath,
      course: coursesData.uid,
      takeAt: +date,
      title: `آزمون ${i + 1}`,
      maximum: _.sample([8, 12, 20, 20]),
      meta: {
        shift: _.random(-3, 3, true)
      }
    }
  })

  const homeworksData = _.sampleSize(sessionsSchedules, 10).map((ss, i): Homeworks => {
    const [, y, m, d] = ss.uid.split('-'),
      date = jalaali([y, m, d].join('-'), 'jYYYY-jMM-jDD').toDate()
    return {
      ...commons(),
      topics: [],
      group: coursesData.group,
      year: coursesData.year,
      __typename: homeworksPath,
      course: coursesData.uid,
      dueDateAt: +date,
      title: `تمرین ${i + 1}`,
    }
  })

  ctxt.sessions.push(...sessionsData)
  ctxt.assessments.push(...assessmetsData)
  ctxt.homeworks.push(...homeworksData)

  const resultsData: Results[] = []

  for (const ass of assessmetsData) {
    for (const student of students) {
      const std = studentByUid[student],
        max = ass.maximum ?? 20,
        shift = normalizeScore(ass.meta?.shift ?? 0, max) * Math.random(),
        score = _.random(std.meta?.doScore ?? 0, std.meta.upScore ?? 20, true) + shift

      resultsData.push({
        ...commons(),
        group: coursesData.group,
        year: coursesData.year,
        __typename: resultsPath,
        course: coursesData.uid,
        student,

        type: 'assessment',
        assessment: ass.uid,
        score: normalizeScore(score, max)
      })
    }
  }

  for (const hmwk of homeworksData) {
    for (const student of _(students).shuffle().slice(0, 12).value()) {
      const std = studentByUid[student],
        score = _.random(std.meta?.doScore ?? 0, std.meta.upScore ?? 20, true)

      resultsData.push({
        ...commons(),
        group: coursesData.group,
        year: coursesData.year,
        __typename: resultsPath,
        course: coursesData.uid,
        student,

        type: 'homework',
        homework: hmwk.uid,
        score: normalizeScore(score, 5, 1)
      })
    }
  }

  for (const sess of _(sessionsData).shuffle().slice(0, 8).value()) {
    for (const student of _(students).shuffle().slice(0, 10).value()) {
      const std = studentByUid[student],
        score = _.random(std.meta?.doScore ?? 0, std.meta.upScore ?? 20, true)

      resultsData.push({
        ...commons(),
        group: coursesData.group,
        year: coursesData.year,
        __typename: resultsPath,
        course: coursesData.uid,
        student,

        type: 'activity',
        session: sess.uid,
        activity: normalizeScore(score, 6, 1) - 3
      })
    }
  }

  for (const sess of _(sessionsData).shuffle().slice(0, 8).value()) {
    for (const student of _(students).shuffle().slice(0, 10).value()) {
      const std = studentByUid[student],
        score = _.random(std.meta?.doScore ?? 0, std.meta.upScore ?? 20, true)

      resultsData.push({
        ...commons(),
        group: coursesData.group,
        year: coursesData.year,
        __typename: resultsPath,
        course: coursesData.uid,
        student,

        type: 'score',
        session: sess.uid,
        score: normalizeScore(score)
      })
    }
  }

  for (const sess of sessionsData) {
    for (const student of students) {
      const attendance = Math.random() > 0.9 ? AttendanceStatuses.ABSENT : AttendanceStatuses.PRESENT
      resultsData.push({
        ...commons(),
        group: coursesData.group,
        year: coursesData.year,
        __typename: resultsPath,
        course: coursesData.uid,
        student,

        type: 'attendance',
        session: sess.uid,
        delay: attendance === AttendanceStatuses.PRESENT && Math.random() > 0.9 ? Math.random() * 15 : undefined,
        attendance
      })
    }
  }

  ctxt.results.push(...resultsData)
}

export function addSchoolSet(title: string): DataContext {
  const ctxt = makeContext({
    ...commons(),
    __typename: groupsPath,
    plan: Plantypes.BASE,
    schedulePatternType: SchedulePatternTypes.MORNING,
    title,
    scoreMask: [
      { "value": 12, "color": "#ff0004", "label": "D" },
      { "value": 17, "color": "#ff8c00", "label": "C" },
      { "value": 19, "color": "#76de00", "label": "B" },
      { "value": 20, "color": "#009e08", "label": "A" }
    ],
    image: [{
      id: 'external',
      type: Mediatypes.IMAGE,
      external: {
        path: 'https://s6.picofile.com/file/8187445000/20120208012.jpg'
      }
    }],
    type: GroupAccessTypes.HIGH_SCHOOL
  })
  const slug = ctxt.group.uid
  ctxt.users.push(makeUser('owner', ctxt.group.uid, Roletypes.owner))
  ctxt.users.push(makeUser('technical', ctxt.group.uid, Roletypes.technical))
  ctxt.users.push(makeUser('admin', ctxt.group.uid, Roletypes.admin))

  const teachersData = _.range(10).map((i) => addTeacher(ctxt, `teacher.${slug}.${i + 1}`, ctxt.group.uid))

  _.range(6).map((_z, i) => {
    /** classroom */
    ctxt.classrooms.push({
      ...commons(),
      __typename: classroomsPath,
      group: ctxt.group.uid,
      year: ThisYear,
      title: `کلاس درسی ${i + 1}`
    })
    const classroomData = _.last(ctxt.classrooms)!

    /** grade */
    const grade = _.sampleSize(GRADE_MAP, 1)[0]
    ctxt.grades.push({
      ...commons(),
      __typename: gradesPath,
      group: ctxt.group.uid,
      year: ThisYear,
      term: GradeTerms.T3,
      students: [],
      // teacher:
      classroom: classroomData.uid,
      title: `${grade?.label} ${i + 1}`,
      grade: grade.code
    })
    const gradeData = _.last(ctxt.grades)!
    gradeData.students = _.range(20).map((_z, j) => addStudentWithParent(
      ctxt,
      `student.${slug}.${i + 1}.${j + 1}`,
      `parent.${slug}.${i + 1}.${j + 1}`,
      ctxt.group.uid,
    ))

    const gradeCourses = _(COURSE_MAP).pick(grade.courses).values().value()
    const schedulePattern = SCHEDULE_PATTERN_MAP[SchedulePatternTypes.MORNING]
    let patterns: string[] = []
    let teachers: string[] = []

    /** courses */
    for (const c of gradeCourses) {
      if (teachers.length < 1) {
        teachers = _.chain(teachersData).shuffle().reverse().shuffle().value()
      }
      const patternLength = Math.random() > 0.8 ? 2 : 1
      if (patterns.length < patternLength) {
        patterns = _.chain(schedulePattern.cells).keys().shuffle().reverse().shuffle().value()
      }
      const pattern = patterns.splice(0, patternLength)

      ctxt.courses.push({
        ...commons(),
        __typename: coursesPath,
        group: ctxt.group.uid,
        year: ThisYear,
        teacher: teachers.pop(),
        // classroom: _.sampleSize(classroomsData, 1)[0].uid,
        grade: gradeData.uid,
        course: c.code,
        pattern
      })
      const coursesData = _.last(ctxt.courses)!
      generateSomeResultFor(ctxt, coursesData, gradeData.students)
    }
  })
  return ctxt
}