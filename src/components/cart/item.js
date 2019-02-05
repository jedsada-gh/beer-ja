import React from 'react';
import { Card } from 'antd';
import TextTruncate from 'react-text-truncate';

const { Meta } = Card;

function CartItem(props) {
  return (
    <Card
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

export default CartItem;
