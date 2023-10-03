const validation = (activityData) => {
  const regexName = /^[a-zA-Z\s]+$/;
  const errors = {};

  if (!activityData.name) {
    errors.name = "A name is required";
  } else if (!regexName.test(activityData.name)) {
    errors.name = "Should only include letters and spaces";
  } else if (activityData.name.length > 35) {
    errors.name = "The name cannot contain more than 35 characters";
  }

  if (!activityData.duration) {
    errors.duration = "Duration is required";
  } else if (isNaN(activityData.duration)) {
    errors.duration = "Duration must be a number";
  } else if (activityData.duration < 1 || activityData.duration > 24) {
    errors.duration = "Duration must be between 1 and 24 hours";
  }

  if (!activityData.season) {
    errors.season = "Season is required";
  }

  if (!activityData.difficulty) {
    errors.difficulty = "Difficulty is required";
  }

  if (!activityData.countries) {
    errors.countries = "Countries are required";
  }

  return errors;
};
export default validation;
