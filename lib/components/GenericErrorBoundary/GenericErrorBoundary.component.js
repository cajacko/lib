// @flow

import React, { Component } from 'react';
import GenericErrorBoundary from './GenericErrorBoundary.render';
import errors from '../../utils/errors';
import logger from '../../utils/logger';
import propsWithoutChildren from '../../utils/propsWithoutChildren';

class GenericErrorBoundaryComponent extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   errorCode: null,
    //   errorTitle: null,
    //   errorMessage: null,
    // };

    this.defaultErrorState = {
      errorTitle: "Damn! We've had a crash.",
      errorMessage:
        "Don't worry, we've notified our rescue team that something went wrong",
    };

    this.state = {
      errorCode: 123,
      errorTitle: "Damn! We've had a crash.",
      errorMessage:
        "Don't worry, we've notified our rescue team that something went wrong",
    };
  }

  componentDidCatch(error, info) {
    const loggerProps = {
      props: undefined,
      error,
      info,
      errorState: undefined,
    };

    try {
      loggerProps.props = propsWithoutChildren(this.props);

      try {
        const errorState = errors.getErrorBoundaryError(
          error,
          info,
          this.props
        );

        loggerProps.errorState = errorState;

        if (
          !errorState ||
          (typeof errorState.code !== 'number' &&
            !errorState.title &&
            !errorState.message)
        ) {
          logger.error(
            'Invalid error state was returned from errors.getErrorBoundaryError, within GenericErrorBoundary',
            loggerProps
          );

          this.setState(this.defaultErrorState);
          return;
        }

        let logMessage = 'GenericErrorBoundary caught an error';

        if (errorState.code) {
          logMessage = `${logMessage}. Code: ${errorState.code}`;
        }

        if (errorState.title) {
          logMessage = `${logMessage} ${errorState.title}`;
        }

        logger.error(logMessage, loggerProps);

        this.setState({
          errorCode: errorState.code,
          errorTitle: errorState.title,
          errorMessage: errorState.message,
        });
      } catch (e) {
        loggerProps.e = e;
        logger.error(
          'Encountered an error when trying to get the error to display for GenericErrorBoundary',
          loggerProps
        );
        this.setState(this.defaultErrorState);
      }
    } catch (e) {
      loggerProps.e = e;
      logger.error(
        'Encountered an error running propsWithoutChildren for logging an error within GenericErrorBoundary',
        loggerProps
      );
      this.setState(this.defaultErrorState);
    }
  }

  render() {
    let errorAction = null;
    let errorActionText = null;

    try {
      errorAction = this.props.errorAction
        ? this.props.errorAction(this.state)
        : null;

      errorActionText = this.props.errorActionText
        ? this.props.errorActionText(this.state)
        : null;
    } catch (e) {
      const message =
        'Could not get the errorAction or errorActionText for the GenericErrorBoundary';

      const loggerProps = {
        e,
        props: undefined,
        error: undefined,
        message,
      };

      try {
        loggerProps.props = propsWithoutChildren(this.props);
        logger.error(message, loggerProps);
      } catch (error) {
        loggerProps.error = error;
        logger.error(
          'Encountered an error running propsWithoutChildren for logging an error within GenericErrorBoundary',
          loggerProps
        );
      }
    }

    return (
      <GenericErrorBoundary
        {...this.state}
        errorAction={() => {}}
        errorActionText="Damn"
        children={this.props.children}
      />
    );
  }
}

export default GenericErrorBoundaryComponent;
