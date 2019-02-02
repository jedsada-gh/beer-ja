import React from 'react';
import { Card, message } from 'antd';
import TextTruncate from 'react-text-truncate';

const { Meta } = Card;

function BeerItem(props) {
  return (
    <Card
      onClick={() => {
        message.info('Coming soon...');
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

export default BeerItem;
