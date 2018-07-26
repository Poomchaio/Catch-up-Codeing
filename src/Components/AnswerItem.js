import React from 'react';
import { Feed } from 'semantic-ui-react';
import Text from './Text/Text';

const AnswerItem = ({ user, answer }) => {
  return (
    <Feed.Event>
      <Feed.Content>
        <Feed.User>
          <Text primary>{user}</Text>
        </Feed.User>
        : {answer}
      </Feed.Content>
    </Feed.Event>
  );
};
export default AnswerItem;
