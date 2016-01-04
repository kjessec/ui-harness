import React from "react";
import Radium from "radium";
import Immutable from "immutable";
import { css, PropTypes } from "js-util/react";
import { Ul } from "../shared";
import SpecListItem from "./SpecListItem";
import SpecListServerItem from "./SpecListServerItem";

/**
 * A list of specs.
 */
class SpecList extends React.Component {
  styles() {
    return css({
      base: {
        paddingBottom: 25
      }
    });
  }

  render() {
    const styles = this.styles();
    const { current } = this.props;
    let specs = this.props.specs.map((spec, i) => {
            return spec.isServer
                ? <SpecListServerItem key={i} spec={ spec } current={ current }/>
                : <SpecListItem key={i} spec={ spec } current={ current }/>
          });

    return (
      <div style={ styles.base }>
        <Ul>{ specs }</Ul>
      </div>
    );
  }
}

// API -------------------------------------------------------------------------
SpecList.propTypes = {
  specs: PropTypes.arrayOf(PropTypes.object),
  current: PropTypes.instanceOf(Immutable.Map).isRequired
};
SpecList.defaultProps = {
  specs: []
};


export default Radium(SpecList);
