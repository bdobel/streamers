// on submit, validate inputs, if valid call onSubmit which calls Action Creator { createStream } which makes request to API server and create new stream using RESTful convention (@ /streams)

import React from 'react';
// redux-form is to automate the wiring of components to action creators to redux store and mapPropsToState
// helpers from redux-form
// Field is component, hence Cap F; reduxForm is a func
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions/index';


class StreamCreate extends React.Component {
  renderError(meta) {
    if (meta.touched && meta.error) {
      return (
        <div className="ui error message">
          <div className="header">{meta.error}</div>
        </div>
      );
    }
  }
  // helper method receiving all props from form
  // desctructered forProps out of arguments
  renderInput = ({ input, label, meta }) => {
    // return (
    //   // pass props to input arg
    //   <input 
    //     onChange={formProps.input.onChange}
    //     value={formProps.input.value}
    //   />
    // );

    // refactor:
    // assign formProps input property (onChange handler, value prop, etc...)  as props to input element
    // classname var assigns input to appear as error, alerting user.  if both error and touch then class = error else empty string.
    const className = `field ${meta.error && meta.touched ? 'error': ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/* helper fundtion w/ logic to render error message.. receiving meta which houses when input has been 'touched'.. at which point should have valid input */}
        {this.renderError(meta)}
      </div>
    );
  }

  // helper method
  // onSubmit callback
  // rather than getting useless event obj.  Now gets all values from form in obj.
  // on user submit call createStream with values in form
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  }

  render() {
    return (
      // onsubmit: name of prop passing down to form. passing a func down to form means it'll fire on submit. .handleSubmit is a callback provided by redux-form. passing in helper func
      // this changes how onSubmit is called.
      // className = error because semantic ui defaults error message to {display: none}
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        {/* imported from redux-form provides field to user (radio button, check box, etc...)...
        doexn't actually know how to render this to screen but serves as component of system to record and manage input - is a tool to hookup form...
        requires prop component which returns actual element to render */}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
};

// validate input values
// receives formValues obj: contains all values existing in form
// needs to be wired up to redux-form so form knows to use
const validate = (formValues) => {
  // error message
  const errors = {};

  if (!formValues.title) {
    // only runs if title is absent
    errors.title = "You must enter a Title.";
  }

  if (!formValues.description){
    errors.description = "You must enter a Description.";
  }

  return errors;
};

// create form wrapped version of our StreamCreate
// wire redux-form and createStream to component
// reduxForm  ({ with config obj }) will return function and we immediately call function, passing in StreamCreate
// validate key is the validate function created above.
const formWrapped = reduxForm({
  form: 'streamCreate',
  validate: validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
