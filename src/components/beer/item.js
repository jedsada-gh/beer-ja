import React from 'react';
import { Card } from 'antd';
import TextTruncate from 'react-text-truncate';
import { connect } from 'react-redux';

const { Meta } = Card;

const mapDispatchToProps = dispatch => {
  return {
    onItemBeerClick: item =>
      dispatch({
        type: 'click_item',
        payload: item
      })
  };
};

function BeerItem(props) {
  return (
    <Card
      onClick={() => {
        props.onItemBeerClick(props.item);
      }}
      hoverable
      cover={
        <div>
          <img
            src={props.item.image_url}
            style={{ height: '200px', width: 'auto', paddingTop: '16px' }}
          />
        </div>
      }
    >
      <Meta
        title={props.item.name}
        description={
          <TextTruncate
            line={2}
            truncateText="…"
            text={props.item.description}
            textTruncateChild={<a href="#">Read more</a>}
          />
        }
      />
    </Card>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(BeerItem);
