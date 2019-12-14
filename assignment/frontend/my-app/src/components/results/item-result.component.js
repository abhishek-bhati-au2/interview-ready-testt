import React from 'react';

const ItemResultComponent = (props) => {
  return (
    <div className="result-item">
      <div className="countryInfoAndPrice">
        <span className="from"> {props.item.from} </span>
        <span className="fa fa-angle-right"/>
        <span className="to"> {props.item.to}</span>
        <span className="price"> {props.item.deal.price}€</span>
      </div>
      <div className="transport">
        <span className="transport-type">{props.item.deal.transport}</span>
        <span className="reference"> {props.item.deal.reference}</span>
        <span
          className="for"> for {props.item.deal.originalData.duration.h + 'h'} {props.item.deal.originalData.duration.m + 'm'}</span>
      </div>
    </div>
  )
};
export default ItemResultComponent;