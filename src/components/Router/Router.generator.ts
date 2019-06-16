import { Store } from 'types/Store/Store';
import { connect, MapStateToPropsParam } from 'react-redux';
import { RouterGeneratedProps, RouterPublicProps } from './Router.props';

// todo: replace with hooooks
const mapStateToProps: MapStateToPropsParam<RouterGeneratedProps, RouterPublicProps, Store> =
  (state: Store): RouterGeneratedProps => ({
    location: state.location,
  });

export default connect(mapStateToProps);
