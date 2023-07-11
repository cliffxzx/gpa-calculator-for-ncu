
const getPoint = (score) => {
  if (score >= 90)
    return 4.3;
  else if (score < 90 && score >= 85)
    return 4;
  else if (score < 85 && score >= 80)
    return 3.7;
  else if (score < 80 && score >= 77)
    return 3.3;
  else if (score < 77 && score >= 73)
    return 3;
  else if (score < 73 && score >= 70)
    return 2.7;
  else if (score < 70 && score >= 67)
    return 2.3;
  else if (score < 67 && score >= 63)
    return 2;
  else if (score < 63 && score >= 60)
    return 1.7;
  else if (score < 60 && score >= 50)
    return 1;
  else
    return 0;
}

export const GPA43 = (allCourse) => {
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
