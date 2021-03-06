import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showModal, hideModal } from './actions';
import { getDisplayName } from './utils';

/**
 * HOC to connect modals to the state.
 *
 * @param {Object} WrappedComponent
 * @param {String} stateName
 * @param {Function|null|undefined} mapStateToProps
 * @param {Function|null|undefined} mapDispatchToProps
 * @returns {WithConnectedModal}
 */
export default (WrappedComponent, stateName, mapStateToProps = null, mapDispatchToProps = null) => {
  const WithConnectedModal = props => (
    <WrappedComponent
      {...props}
    />
  );

  WithConnectedModal.propTypes = {
    name: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    showModal: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  WithConnectedModal.displayName = `WithConnectedModal(${getDisplayName(WrappedComponent)})`;

  return connect(
    (state, ownProps) => Object.assign({}, {
      open: state[stateName].modalName === ownProps.name
    }, mapStateToProps ? mapStateToProps(state, ownProps) : {}),
    (dispatch, ownProps) => Object.assign({}, {
      showModal: () => {
        dispatch(showModal(ownProps.name));
      },
      onClose: () => {
        dispatch(hideModal());
      }
    }, mapDispatchToProps ? mapDispatchToProps(dispatch, ownProps) : null)
  )(WithConnectedModal);
};
