export type TOfferedCourse = {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  course: Course;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: any[];
  completedCourses: CompletedCourse[];
  completedCoursesIds: string[];
  isPreRequisitesFulFilled: boolean;
  isAlreadyEnrolled: boolean;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface CompletedCourse {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  offeredCourse: string;
  course: string;
  student: string;
  faculty: string;
  isEnrolled: boolean;
  courseMarks: CourseMarks;
  grade: string;
  gradePoints: number;
  isCompleted: boolean;
  __v: number;
}

export interface CourseMarks {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
}
