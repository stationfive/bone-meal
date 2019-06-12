import { Store } from 'types/Store/Store';
import { connect, MapStateToPropsParam } from 'react-redux';
import { RouterGeneratedProps, RouterPassedProps } from './Router.props';

// todo: replace with hooooks
const mapStateToProps: MapStateToPropsParam<RouterGeneratedProps, RouterPassedProps, Store> =
  (state: Store): RouterGeneratedProps => ({
    location: state.location,
  });

export default connect(mapStateToProps);
