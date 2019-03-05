import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FilterBox from "modules/portfolio/components/common/quads/filter-box";
import { pick } from "lodash";

import { createMarketsStateObject } from "modules/portfolio/helpers/create-markets-state-object";
import { createTabsInfo } from "modules/portfolio/helpers/create-tabs-info";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const mergeProps = (sP, dP, oP) => {
  const marketsObj = oP.data.reduce((obj, market) => {
    obj[market.id] = market;
    return obj;
  }, {});

  const marketsPick =
    oP.data &&
    oP.data.map((
      market // when these things change then component will re-render/re-sort
    ) => pick(market, oP.pickVariables));

  const marketsByState = createMarketsStateObject(marketsPick);

  return {
    ...oP,
    ...sP,
    dataObj: marketsObj,
    data: marketsByState,
  };
};

const FilterBoxContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(FilterBox)
);

export default FilterBoxContainer;
