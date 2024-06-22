import React, { useState, useEffect } from 'react';
import useForm from './useForm';
import validate from './validate';

const SurveyForm = () => {
  const initialValues = {
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
    additionalQuestions: [],
    submitted: false,
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(initialValues, validate);

  useEffect(() => {
    if (values.surveyTopic) {
      fetchAdditionalQuestions(values.surveyTopic);
    }
  }, [values.surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(`https://api.example.com/questions?topic=${topic}`);
      const data = await response.json();
      setValues((prevValues) => ({
        ...prevValues,
        additionalQuestions: data.questions,
      }));
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Survey Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="fullName" value={values.fullName} onChange={handleChange} />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Survey Topic:</label>
          <select name="surveyTopic" value={values.surveyTopic} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p className="error">{errors.surveyTopic}</p>}
        </div>

        {values.surveyTopic === 'Technology' && (
          <div className="form-group">
            <label>Favorite Programming Language:</label>
            <select name="favoriteLanguage" value={values.favoriteLanguage} onChange={handleChange}>
              <option value="">Select</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteLanguage && <p className="error">{errors.favoriteLanguage}</p>}
          </div>
        )}

        {values.surveyTopic === 'Technology' && (
          <div className="form-group">
            <label>Years of Experience:</label>
            <input type="number" name="yearsOfExperience" value={values.yearsOfExperience} onChange={handleChange} />
            {errors.yearsOfExperience && <p className="error">{errors.yearsOfExperience}</p>}
          </div>
        )}

        {values.surveyTopic === 'Health' && (
          <div className="form-group">
            <label>Exercise Frequency:</label>
            <select name="exerciseFrequency" value={values.exerciseFrequency} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <p className="error">{errors.exerciseFrequency}</p>}
          </div>
        )}

        {values.surveyTopic === 'Health' && (
          <div className="form-group">
            <label>Diet Preference:</label>
            <select name="dietPreference" value={values.dietPreference} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <p className="error">{errors.dietPreference}</p>}
          </div>
        )}

        {values.surveyTopic === 'Education' && (
          <div className="form-group">
            <label>Highest Qualification:</label>
            <select name="highestQualification" value={values.highestQualification} onChange={handleChange}>
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && <p className="error">{errors.highestQualification}</p>}
          </div>
        )}

        {values.surveyTopic === 'Education' && (
          <div className="form-group">
            <label>Field of Study:</label>
            <input type="text" name="fieldOfStudy" value={values.fieldOfStudy} onChange={handleChange} />
            {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy}</p>}
          </div>
        )}

        {values.additionalQuestions.map((question, index) => (
          <div key={index} className="form-group">
            <label>{question.label}</label>
            <input type="text" name={`additionalQuestion${index}`} value={values[`additionalQuestion${index}`] || ''} onChange={handleChange} />
          </div>
        ))}

        <div className="form-group">
          <label>Feedback:</label>
          <textarea name="feedback" value={values.feedback} onChange={handleChange} />
          {errors.feedback && <p className="error">{errors.feedback}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {values.submitted && (
        <div className="summary">
          <h3>Summary:</h3>
          <p>Full Name: {values.fullName}</p>
          <p>Email: {values.email}</p>
          <p>Survey Topic: {values.surveyTopic}</p>
          {values.surveyTopic === 'Technology' && (
            <>
              <p>Favorite Programming Language: {values.favoriteLanguage}</p>
              <p>Years of Experience: {values.yearsOfExperience}</p>
            </>
          )}
          {values.surveyTopic === 'Health' && (
            <>
              <p>Exercise Frequency: {values.exerciseFrequency}</p>
              <p>Diet Preference: {values.dietPreference}</p>
            </>
          )}
          {values.surveyTopic === 'Education' && (
            <>
              <p>Highest Qualification: {values.highestQualification}</p>
              <p>Field of Study: {values.fieldOfStudy}</p>
            </>
          )}
          {values.additionalQuestions.map((question, index) => (
            <p key={index}>{question.label}: {values[`additionalQuestion${index}`]}</p>
          ))}
          <p>Feedback: {values.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
