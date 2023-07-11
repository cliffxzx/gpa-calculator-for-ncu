
const getPoint = (score) => {
  if (score >= 80)
    return 4;
  else if (score < 80 && score >= 70)
    return 3;
  else if (score < 70 && score >= 60)
    return 2;
  else if (score < 60 && score >= 1)
    return 1;
  else
    return 0;
}

export const GPA4 = (allCourse) => {
  const validCourse = allCourse
    .map((course) => {
      if (course.type == "操行" || course.type == "勞動服務" || course.type == "Conduct" || course.type.match(".*Service-learning.*")) {
        return null;
      }

      if (isNaN(parseFloat(course.credits)) || !isFinite(course.credits)) {
        return null;
      }

      if (isNaN(parseFloat(course.score)) || !isFinite(course.score)) {
        return null;
      }

      return course;
    })
    .filter(Boolean)

  const totalPoints = validCourse
    .map((course) => {
      const point = getPoint(course.score);
      return point * course.credits;
    })
    .reduce((a, b) => a + b, 0)

  const totalCredits = validCourse
    .reduce((a, b) => a + b.credits, 0)

  const point = totalPoints / totalCredits;

  return isNaN(point) ? 0 : point;
}