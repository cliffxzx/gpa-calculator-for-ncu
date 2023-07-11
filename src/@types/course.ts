interface Courses {
  [id: string]: Course
}

interface Course {
  id: string,
  code: string,
  class: string,
  name: string,
  type: string,
  program: string,
  credits: number,
  score: number,
}