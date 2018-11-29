// @flow

import React, { Component } from 'react';
import logger from '../../utils/logger';

type Props = {
  dataNotFound?: ?boolean,
};

const withLogIfDataNotFound = (CustomComponent, message, NotFoundComponent) =>
  class WithLogIfDataNotFound extends Component<Props> {
    /**
     * Initialise the class, set the initial state and bind the methods
     *
     * @param {Object} props The props passed to the component, check flow for
     * more detail
     *
     * @return {Void} No return value
     */
    constructor(props: Props) {
      super(props);

      this.checkDataNotFound(props);
    }

    componentWillReceiveProps(props) {
      this.checkDataNotFound(props);
    }

    checkDataNotFound(props) {
      const finalProps = props || this.props;
      const { dataNotFound } = finalProps;

      if (dataNotFound) {
        logger.error(
          message ||
            'Data not found for the component. No custom message given',
          finalProps
        );
      }
    }

    /**
     * Render the component
     *
     * @return {ReactElement} Markup to render
     */
    render() {
      if (this.props.dataNotFound) {
        if (!NotFoundComponent) return null;

        return <NotFoundComponent {...this.props} />;
      }

      return <CustomComponent {...this.props} />;
    }
  };

export default withLogIfDataNotFound;
